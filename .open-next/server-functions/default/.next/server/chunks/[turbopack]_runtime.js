var RUNTIME_PUBLIC_PATH = "server/chunks/[turbopack]_runtime.js";
var RELATIVE_ROOT_PATH = "..";
var ASSET_PREFIX = "/";
// Apply forwarded globals from workerData if running in a worker thread
if (typeof require !== 'undefined') {
    try {
        var { workerData } = require('worker_threads');
        if (workerData?.__turbopack_globals__) {
            Object.assign(globalThis, workerData.__turbopack_globals__);
            // Remove internal data so it's not visible to user code
            delete workerData.__turbopack_globals__;
        }
    } catch (_) {
        // Not in a worker thread context, ignore
    }
}
/**
 * This file contains runtime types and functions that are shared between all
 * TurboPack ECMAScript runtimes.
 *
 * It will be prepended to the runtime code of each runtime.
 */ /* eslint-disable @typescript-eslint/no-unused-vars */ /// <reference path="./runtime-types.d.ts" />
/// <reference path="./async-module.ts" />
/**
 * Describes why a module was instantiated.
 * Shared between browser and Node.js runtimes.
 */ var SourceType = /*#__PURE__*/ function(SourceType) {
    /**
   * The module was instantiated because it was included in an evaluated chunk's
   * runtime.
   * SourceData is a ChunkPath.
   */ SourceType[SourceType["Runtime"] = 0] = "Runtime";
    /**
   * The module was instantiated because a parent module imported it.
   * SourceData is a ModuleId.
   */ SourceType[SourceType["Parent"] = 1] = "Parent";
    /**
   * The module was instantiated because it was included in a chunk's hot module
   * update.
   * SourceData is an array of ModuleIds or undefined.
   */ SourceType[SourceType["Update"] = 2] = "Update";
    return SourceType;
}(SourceType || {});
/**
 * Flag indicating which module object type to create when a module is merged. Set to `true`
 * by each runtime that uses ModuleWithDirection (browser dev-base.ts, nodejs dev-base.ts,
 * nodejs build-base.ts). Browser production (build-base.ts) leaves it as `false` since it
 * uses plain Module objects.
 */ let createModuleWithDirectionFlag = false;
const REEXPORTED_OBJECTS = new WeakMap();
/**
 * Constructs the `__turbopack_context__` object for a module.
 */ function Context(module, exports) {
    this.m = module;
    // We need to store this here instead of accessing it from the module object to:
    // 1. Make it available to factories directly, since we rewrite `this` to
    //    `__turbopack_context__.e` in CJS modules.
    // 2. Support async modules which rewrite `module.exports` to a promise, so we
    //    can still access the original exports object from functions like
    //    `esmExport`
    // Ideally we could find a new approach for async modules and drop this property altogether.
    this.e = exports;
}
const contextPrototype = Context.prototype;
const hasOwnProperty = Object.prototype.hasOwnProperty;
const toStringTag = typeof Symbol !== 'undefined' && Symbol.toStringTag;
function defineProp(obj, name, options) {
    if (!hasOwnProperty.call(obj, name)) Object.defineProperty(obj, name, options);
}
function getOverwrittenModule(moduleCache, id) {
    let module = moduleCache[id];
    if (!module) {
        if (createModuleWithDirectionFlag) {
            // set in development modes for hmr support
            module = createModuleWithDirection(id);
        } else {
            module = createModuleObject(id);
        }
        moduleCache[id] = module;
    }
    return module;
}
/**
 * Creates the module object. Only done here to ensure all module objects have the same shape.
 */ function createModuleObject(id) {
    return {
        exports: {},
        error: undefined,
        id,
        namespaceObject: undefined
    };
}
function createModuleWithDirection(id) {
    return {
        exports: {},
        error: undefined,
        id,
        namespaceObject: undefined,
        parents: [],
        children: []
    };
}
const BindingTag_Value = 0;
/**
 * Adds the getters to the exports object.
 */ function esm(exports, bindings, dynamic) {
    defineProp(exports, '__esModule', {
        value: true
    });
    if (toStringTag) defineProp(exports, toStringTag, {
        value: 'Module'
    });
    let i = 0;
    while(i < bindings.length){
        const propName = bindings[i++];
        const tagOrFunction = bindings[i++];
        if (typeof tagOrFunction === 'number') {
            if (tagOrFunction === BindingTag_Value) {
                defineProp(exports, propName, {
                    value: bindings[i++],
                    enumerable: true,
                    writable: false
                });
            } else {
                throw new Error(`unexpected tag: ${tagOrFunction}`);
            }
        } else {
            const getterFn = tagOrFunction;
            if (typeof bindings[i] === 'function') {
                const setterFn = bindings[i++];
                defineProp(exports, propName, {
                    get: getterFn,
                    set: setterFn,
                    enumerable: true
                });
            } else {
                defineProp(exports, propName, {
                    get: getterFn,
                    enumerable: true
                });
            }
        }
    }
    // The properties defined above are already non-configurable and
    // non-writable, so the namespace's existing exports are effectively
    // immutable. Sealing additionally makes the object non-extensible, matching
    // real ESM-namespace semantics. Modules with dynamic re-exports
    // (`export *` from a CommonJS module) must stay extensible so the dynamic
    // export proxy can surface keys discovered at runtime, so skip the seal for
    // them.
    if (!dynamic) Object.seal(exports);
}
/**
 * Makes the module an ESM with exports
 */ function esmExport(bindings, id, dynamic) {
    let module;
    let exports;
    if (id != null) {
        module = getOverwrittenModule(this.c, id);
        exports = module.exports;
    } else {
        module = this.m;
        exports = this.e;
    }
    module.namespaceObject = exports;
    esm(exports, bindings, dynamic);
}
contextPrototype.s = esmExport;
function ensureDynamicExports(module, exports) {
    let reexportedObjects = REEXPORTED_OBJECTS.get(module);
    if (!reexportedObjects) {
        REEXPORTED_OBJECTS.set(module, reexportedObjects = []);
        // Returns the re-exported object that provides `prop` as an own property,
        // or `undefined` if none does. The traps share this logic so they always
        // agree on which keys are synthesized from `reexportedObjects`. `default`
        // is never re-exported by `export *`, so it is never synthesized.
        const reexportOwning = (prop)=>{
            if (prop !== 'default') {
                for (const obj of reexportedObjects){
                    if (hasOwnProperty.call(obj, prop)) return obj;
                }
            }
            return undefined;
        };
        // Modules with dynamic re-exports are not sealed by `esm()`, so the
        // target beneath the namespace stays extensible. That is what lets the
        // `ownKeys` and `getOwnPropertyDescriptor` traps legally report keys that
        // exist on `reexportedObjects` but not on the target itself.
        module.exports = module.namespaceObject = new Proxy(exports, {
            get (target, prop) {
                if (hasOwnProperty.call(target, prop) || prop === 'default' || prop === '__esModule') {
                    return Reflect.get(target, prop);
                }
                const obj = reexportOwning(prop);
                return obj && Reflect.get(obj, prop);
            },
            // The namespace is read-only, like a real esm namespace object. The
            // re-exported modules can still mutate their own exports (exposed live
            // via `get`), but mutating the namespace itself is rejected. Refusing
            // here, rather than forwarding to the extensible target, also prevents an
            // assignment/definition from shadowing a dynamic re-export. It also
            // prevents delete from removing a static export.
            set () {
                return false;
            },
            defineProperty () {
                return false;
            },
            deleteProperty () {
                return false;
            },
            // The `has` trap ensures that `'exportName' in starImports` will reflect
            // the truth of whether a key is exported.
            has (target, prop) {
                if (Reflect.has(target, prop)) return true;
                if (prop === 'default' || prop === '__esModule') return false;
                return reexportOwning(prop) !== undefined;
            },
            // ownKeys and getOwnPropertyDescriptor together make the keys enumerable.
            // If a value is returned from `ownKeys` but its property descriptor is
            // not enumerable, it will not be visible to iterator methods.
            // Collectively, they allow code like the following:
            //
            // ```
            // // module.js re-exports dynamic CJS exports
            // export * from './legacyModule.cjs'
            //
            // // from another JS file, reference the re-exported dynamic values
            // import * as Namespace from './module.js'
            // Object.keys(Namespace)
            // ```
            ownKeys (target) {
                const keys = Reflect.ownKeys(target);
                for (const obj of reexportedObjects){
                    for (const key of Reflect.ownKeys(obj)){
                        if (key !== 'default' && !keys.includes(key)) keys.push(key);
                    }
                }
                return keys;
            },
            getOwnPropertyDescriptor (target, prop) {
                const own = Reflect.getOwnPropertyDescriptor(target, prop);
                if (own || prop === 'default' || prop === '__esModule') return own;
                const obj = reexportOwning(prop);
                if (obj) {
                    // Synthetic keys don't exist on the target, so they MUST be
                    // reported as configurable. However the set/delete traps above will
                    // prevent them from actually being changed
                    return {
                        enumerable: true,
                        configurable: true,
                        get: ()=>Reflect.get(obj, prop)
                    };
                }
                return undefined;
            }
        });
    }
    return reexportedObjects;
}
/**
 * Dynamically exports properties from an object
 */ function dynamicExport(object, id) {
    let module;
    let exports;
    if (id != null) {
        module = getOverwrittenModule(this.c, id);
        exports = module.exports;
    } else {
        module = this.m;
        exports = this.e;
    }
    const reexportedObjects = ensureDynamicExports(module, exports);
    if (typeof object === 'object' && object !== null) {
        reexportedObjects.push(object);
    }
}
contextPrototype.j = dynamicExport;
function exportValue(value, id) {
    let module;
    if (id != null) {
        module = getOverwrittenModule(this.c, id);
    } else {
        module = this.m;
    }
    module.exports = value;
}
contextPrototype.v = exportValue;
function exportNamespace(namespace, id) {
    let module;
    if (id != null) {
        module = getOverwrittenModule(this.c, id);
    } else {
        module = this.m;
    }
    module.exports = module.namespaceObject = namespace;
}
contextPrototype.n = exportNamespace;
function createGetter(obj, key) {
    return ()=>obj[key];
}
/**
 * @returns prototype of the object
 */ const getProto = Object.getPrototypeOf ? (obj)=>Object.getPrototypeOf(obj) : (obj)=>obj.__proto__;
/** Prototypes that are not expanded for exports */ const LEAF_PROTOTYPES = [
    null,
    getProto({}),
    getProto([]),
    getProto(getProto)
];
/**
 * @param raw
 * @param ns
 * @param allowExportDefault
 *   * `false`: will have the raw module as default export
 *   * `true`: will have the default property as default export
 */ function interopEsm(raw, ns, allowExportDefault) {
    const bindings = [];
    let defaultLocation = -1;
    for(let current = raw; (typeof current === 'object' || typeof current === 'function') && !LEAF_PROTOTYPES.includes(current); current = getProto(current)){
        for (const key of Object.getOwnPropertyNames(current)){
            bindings.push(key, createGetter(raw, key));
            if (defaultLocation === -1 && key === 'default') {
                defaultLocation = bindings.length - 1;
            }
        }
    }
    // this is not really correct
    // we should set the `default` getter if the imported module is a `.cjs file`
    if (!(allowExportDefault && defaultLocation >= 0)) {
        // Replace the binding with one for the namespace itself in order to preserve iteration order.
        if (defaultLocation >= 0) {
            // Replace the getter with the value
            bindings.splice(defaultLocation, 1, BindingTag_Value, raw);
        } else {
            bindings.push('default', BindingTag_Value, raw);
        }
    }
    esm(ns, bindings);
    return ns;
}
function createNS(raw) {
    if (typeof raw === 'function') {
        return function(...args) {
            return raw.apply(this, args);
        };
    } else {
        return Object.create(null);
    }
}
function esmImport(id) {
    const module = getOrInstantiateModuleFromParent(id, this.m);
    // any ES module has to have `module.namespaceObject` defined.
    if (module.namespaceObject) return module.namespaceObject;
    // only ESM can be an async module, so we don't need to worry about exports being a promise here.
    const raw = module.exports;
    return module.namespaceObject = interopEsm(raw, createNS(raw), raw && raw.__esModule);
}
contextPrototype.i = esmImport;
function asyncLoader(moduleId) {
    const loader = this.r(moduleId);
    return loader(esmImport.bind(this));
}
contextPrototype.A = asyncLoader;
// Add a simple runtime require so that environments without one can still pass
// `typeof require` CommonJS checks so that exports are correctly registered.
const runtimeRequire = // @ts-ignore
typeof require === 'function' ? require : function require1() {
    throw new Error('Unexpected use of runtime require');
};
contextPrototype.t = runtimeRequire;
function commonJsRequire(id) {
    return getOrInstantiateModuleFromParent(id, this.m).exports;
}
contextPrototype.r = commonJsRequire;
/**
 * Remove fragments and query parameters since they are never part of the context map keys
 *
 * This matches how we parse patterns at resolving time.  Arguably we should only do this for
 * strings passed to `import` but the resolve does it for `import` and `require` and so we do
 * here as well.
 */ function parseRequest(request) {
    // Per the URI spec fragments can contain `?` characters, so we should trim it off first
    // https://datatracker.ietf.org/doc/html/rfc3986#section-3.5
    const hashIndex = request.indexOf('#');
    if (hashIndex !== -1) {
        request = request.substring(0, hashIndex);
    }
    const queryIndex = request.indexOf('?');
    if (queryIndex !== -1) {
        request = request.substring(0, queryIndex);
    }
    return request;
}
/**
 * `require.context` and require/import expression runtime.
 */ function moduleContext(map) {
    function moduleContext(id) {
        id = parseRequest(id);
        if (hasOwnProperty.call(map, id)) {
            return map[id].module();
        }
        const e = new Error(`Cannot find module '${id}'`);
        e.code = 'MODULE_NOT_FOUND';
        throw e;
    }
    moduleContext.keys = ()=>{
        return Object.keys(map);
    };
    moduleContext.resolve = (id)=>{
        id = parseRequest(id);
        if (hasOwnProperty.call(map, id)) {
            return map[id].id();
        }
        const e = new Error(`Cannot find module '${id}'`);
        e.code = 'MODULE_NOT_FOUND';
        throw e;
    };
    moduleContext.import = async (id)=>{
        return await moduleContext(id);
    };
    return moduleContext;
}
contextPrototype.f = moduleContext;
/**
 * Returns the path of a chunk defined by its data.
 */ function getChunkPath(chunkData) {
    return typeof chunkData === 'string' ? chunkData : chunkData.path;
}
// Load the CompressedmoduleFactories of a chunk into the `moduleFactories` Map.
// The CompressedModuleFactories format is
// - 1 or more module ids
// - a module factory function
// So walking this is a little complex but the flat structure is also fast to
// traverse, we can use `typeof` operators to distinguish the two cases.
function installCompressedModuleFactories(chunkModules, offset, moduleFactories, newModuleId) {
    let i = offset;
    while(i < chunkModules.length){
        let end = i + 1;
        // Find our factory function
        while(end < chunkModules.length && typeof chunkModules[end] !== 'function'){
            end++;
        }
        if (end === chunkModules.length) {
            throw new Error('malformed chunk format, expected a factory function');
        }
        // Install the factory for each module ID that doesn't already have one.
        // When some IDs in this group already have a factory, reuse that existing
        // group factory for the missing IDs to keep all IDs in the group consistent.
        // Otherwise, install the factory from this chunk.
        const moduleFactoryFn = chunkModules[end];
        let existingGroupFactory = undefined;
        for(let j = i; j < end; j++){
            const id = chunkModules[j];
            const existingFactory = moduleFactories.get(id);
            if (existingFactory) {
                existingGroupFactory = existingFactory;
                break;
            }
        }
        const factoryToInstall = existingGroupFactory ?? moduleFactoryFn;
        let didInstallFactory = false;
        for(let j = i; j < end; j++){
            const id = chunkModules[j];
            if (!moduleFactories.has(id)) {
                if (!didInstallFactory) {
                    if (factoryToInstall === moduleFactoryFn) {
                        applyModuleFactoryName(moduleFactoryFn);
                    }
                    didInstallFactory = true;
                }
                moduleFactories.set(id, factoryToInstall);
                newModuleId?.(id);
            }
        }
        i = end + 1; // end is pointing at the last factory advance to the next id or the end of the array.
    }
}
/**
 * A pseudo "fake" URL object to resolve to its relative path.
 *
 * When UrlRewriteBehavior is set to relative, calls to the `new URL()` will construct url without base using this
 * runtime function to generate context-agnostic urls between different rendering context, i.e ssr / client to avoid
 * hydration mismatch.
 *
 * This is based on webpack's existing implementation:
 * https://github.com/webpack/webpack/blob/87660921808566ef3b8796f8df61bd79fc026108/lib/runtime/RelativeUrlRuntimeModule.js
 */ const relativeURL = function relativeURL(inputUrl) {
    const realUrl = new URL(inputUrl, 'x:/');
    const values = {};
    for(const key in realUrl)values[key] = realUrl[key];
    values.href = inputUrl;
    values.pathname = inputUrl.replace(/[?#].*/, '');
    values.origin = values.protocol = '';
    values.toString = values.toJSON = (..._args)=>inputUrl;
    for(const key in values)Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        value: values[key]
    });
};
relativeURL.prototype = URL.prototype;
contextPrototype.U = relativeURL;
/**
 * Utility function to ensure all variants of an enum are handled.
 */ function invariant(never, computeMessage) {
    throw new Error(`Invariant: ${computeMessage(never)}`);
}
/**
 * Constructs an error message for when a module factory is not available.
 */ function factoryNotAvailableMessage(moduleId, sourceType, sourceData) {
    let instantiationReason;
    switch(sourceType){
        case 0:
            instantiationReason = `as a runtime entry of chunk ${sourceData}`;
            break;
        case 1:
            instantiationReason = `because it was required from module ${sourceData}`;
            break;
        case 2:
            instantiationReason = 'because of an HMR update';
            break;
        default:
            invariant(sourceType, (sourceType)=>`Unknown source type: ${sourceType}`);
    }
    return `Module ${moduleId} was instantiated ${instantiationReason}, but the module factory is not available.`;
}
/**
 * A stub function to make `require` available but non-functional in ESM.
 */ function requireStub(_moduleId) {
    throw new Error('dynamic usage of require is not supported');
}
contextPrototype.z = requireStub;
// Make `globalThis` available to the module in a way that cannot be shadowed by a local variable.
contextPrototype.g = globalThis;
function applyModuleFactoryName(factory) {
    // Give the module factory a nice name to improve stack traces.
    Object.defineProperty(factory, 'name', {
        value: 'module evaluation'
    });
}
/// <reference path="../shared/runtime/runtime-utils.ts" />
/// A 'base' utilities to support runtime can have externals.
/// Currently this is for node.js / edge runtime both.
/// If a fn requires node.js specific behavior, it should be placed in `node-external-utils` instead.
async function externalImport(id) {
    let raw;
    try {
        switch (id) {
  case "next/dist/compiled/@vercel/og/index.node.js":
    raw = await import("next/dist/compiled/@vercel/og/index.edge.js");
    break;
  default:
    raw = await import(id);
};
    } catch (err) {
        // TODO(alexkirsz) This can happen when a client-side module tries to load
        // an external module we don't provide a shim for (e.g. querystring, url).
        // For now, we fail semi-silently, but in the future this should be a
        // compilation error.
        throw new Error(`Failed to load external module ${id}: ${err}`);
    }
    if (raw && raw.__esModule && raw.default && 'default' in raw.default) {
        return interopEsm(raw.default, createNS(raw), true);
    }
    return raw;
}
contextPrototype.y = externalImport;
function externalRequire(id, thunk, esm = false) {
    let raw;
    try {
        raw = thunk();
    } catch (err) {
        // TODO(alexkirsz) This can happen when a client-side module tries to load
        // an external module we don't provide a shim for (e.g. querystring, url).
        // For now, we fail semi-silently, but in the future this should be a
        // compilation error.
        throw new Error(`Failed to load external module ${id}: ${err}`);
    }
    if (!esm || raw.__esModule) {
        return raw;
    }
    return interopEsm(raw, createNS(raw), true);
}
externalRequire.resolve = (id, options)=>{
    return require.resolve(id, options);
};
contextPrototype.x = externalRequire;
/* eslint-disable @typescript-eslint/no-unused-vars */ const path = require('path');
const relativePathToRuntimeRoot = path.relative(RUNTIME_PUBLIC_PATH, '.');
// Compute the relative path to the `distDir`.
const relativePathToDistRoot = path.join(relativePathToRuntimeRoot, RELATIVE_ROOT_PATH);
const RUNTIME_ROOT = path.resolve(__filename, relativePathToRuntimeRoot);
// Compute the absolute path to the root, by stripping distDir from the absolute path to this file.
const ABSOLUTE_ROOT = path.resolve(__filename, relativePathToDistRoot);
/**
 * Returns an absolute path to the given module path.
 * Module path should be relative, either path to a file or a directory.
 *
 * This fn allows to calculate an absolute path for some global static values, such as
 * `__dirname` or `import.meta.url` that Turbopack will not embeds in compile time.
 * See ImportMetaBinding::code_generation for the usage.
 */ function resolveAbsolutePath(modulePath) {
    if (modulePath) {
        return path.join(ABSOLUTE_ROOT, modulePath);
    }
    return ABSOLUTE_ROOT;
}
Context.prototype.P = resolveAbsolutePath;
/**
 * Returns an absolute `file://` URL for the given module path.
 *
 * Uses `url.pathToFileURL` so that the resulting URL is a valid file URI on
 * all platforms (forward slashes on Windows, drive letters handled
 * correctly, path segments URL-encoded).
 */ function resolveFileUrl(modulePath) {
    return require('url').pathToFileURL(resolveAbsolutePath(modulePath)).href;
}
Context.prototype.F = resolveFileUrl;
/* eslint-disable @typescript-eslint/no-unused-vars */ /// <reference path="../../shared/runtime/runtime-utils.ts" />
/// <reference path="../../shared-node/base-externals-utils.ts" />
/// <reference path="../../shared-node/node-externals-utils.ts" />
/// <reference path="./nodejs-globals.d.ts" />
/**
 * Base Node.js runtime shared between production and development.
 * Contains chunk loading, module caching, and other non-HMR functionality.
 */ process.env.TURBOPACK = '1';
const url = require('url');
const moduleFactories = new Map();
const moduleCache = Object.create(null);
/**
 * Returns an absolute path to the given module's id.
 */ function resolvePathFromModule(moduleId) {
    const exported = this.r(moduleId);
    const exportedPath = exported?.default ?? exported;
    if (typeof exportedPath !== 'string') {
        return exported;
    }
    const strippedAssetPrefix = exportedPath.slice(ASSET_PREFIX.length);
    const resolved = path.resolve(RUNTIME_ROOT, strippedAssetPrefix);
    return url.pathToFileURL(resolved).href;
}
/**
 * Exports a URL value. No suffix is added in Node.js runtime.
 */ function exportUrl(urlValue, id) {
    exportValue.call(this, urlValue, id);
}
function loadRuntimeChunk(sourcePath, chunkData) {
    if (typeof chunkData === 'string') {
        loadRuntimeChunkPath(sourcePath, chunkData);
    } else {
        loadRuntimeChunkPath(sourcePath, chunkData.path);
    }
}
const loadedChunks = new Set();
const unsupportedLoadChunk = Promise.resolve(undefined);
const loadedChunk = Promise.resolve(undefined);
const chunkCache = new Map();
function clearChunkCache() {
    chunkCache.clear();
    loadedChunks.clear();
}
function loadRuntimeChunkPath(sourcePath, chunkPath) {
    if (!isJs(chunkPath)) {
        // We only support loading JS chunks in Node.js.
        // This branch can be hit when trying to load a CSS chunk.
        return;
    }
    if (loadedChunks.has(chunkPath)) {
        return;
    }
    try {
        const resolved = path.resolve(RUNTIME_ROOT, chunkPath);
        const chunkModules = requireChunk(chunkPath);
        installCompressedModuleFactories(chunkModules, 0, moduleFactories);
        loadedChunks.add(chunkPath);
    } catch (cause) {
        let errorMessage = `Failed to load chunk ${chunkPath}`;
        if (sourcePath) {
            errorMessage += ` from runtime for chunk ${sourcePath}`;
        }
        const error = new Error(errorMessage, {
            cause
        });
        error.name = 'ChunkLoadError';
        throw error;
    }
}
function loadChunkAsync(chunkData) {
    const chunkPath = typeof chunkData === 'string' ? chunkData : chunkData.path;
    if (!isJs(chunkPath)) {
        // We only support loading JS chunks in Node.js.
        // This branch can be hit when trying to load a CSS chunk.
        return unsupportedLoadChunk;
    }
    let entry = chunkCache.get(chunkPath);
    if (entry === undefined) {
        try {
            // resolve to an absolute path to simplify `require` handling
            const resolved = path.resolve(RUNTIME_ROOT, chunkPath);
            // TODO: consider switching to `import()` to enable concurrent chunk loading and async file io
            // However this is incompatible with hot reloading (since `import` doesn't use the require cache)
            const chunkModules = requireChunk(chunkPath);
            installCompressedModuleFactories(chunkModules, 0, moduleFactories);
            entry = loadedChunk;
        } catch (cause) {
            const errorMessage = `Failed to load chunk ${chunkPath} from module ${this.m.id}`;
            const error = new Error(errorMessage, {
                cause
            });
            error.name = 'ChunkLoadError';
            // Cache the failure promise, future requests will also get this same rejection
            entry = Promise.reject(error);
        }
        chunkCache.set(chunkPath, entry);
    }
    // TODO: Return an instrumented Promise that React can use instead of relying on referential equality.
    return entry;
}
contextPrototype.l = loadChunkAsync;
function loadChunkAsyncByUrl(chunkUrl) {
    const path1 = url.fileURLToPath(new URL(chunkUrl, RUNTIME_ROOT));
    return loadChunkAsync.call(this, path1);
}
contextPrototype.L = loadChunkAsyncByUrl;
// Shared runtime primitive: the root that on-disk chunk paths are resolved
// against. Used by the bundled wasm helper (exposed as `__turbopack_runtime_root__`).
contextPrototype.w = RUNTIME_ROOT;
const regexJsUrl = /\.js(?:\?[^#]*)?(?:#.*)?$/;
/**
 * Checks if a given path/URL ends with .js, optionally followed by ?query or #fragment.
 */ function isJs(chunkUrlOrPath) {
    return regexJsUrl.test(chunkUrlOrPath);
}
/* eslint-disable @typescript-eslint/no-unused-vars */ /// <reference path="./runtime-base.ts" />
/**
 * Production Node.js runtime.
 * Uses ModuleWithDirection and simple module instantiation without HMR support.
 */ // moduleCache and moduleFactories are declared in runtime-base.ts
// this is read in runtime-utils.ts so it creates a module with direction for hmr
createModuleWithDirectionFlag = true;
const nodeContextPrototype = Context.prototype;
nodeContextPrototype.q = exportUrl;
nodeContextPrototype.M = moduleFactories;
// Cast moduleCache to ModuleWithDirection for production mode
nodeContextPrototype.c = moduleCache;
nodeContextPrototype.R = resolvePathFromModule;
nodeContextPrototype.C = clearChunkCache;
function instantiateModule(id, sourceType, sourceData) {
    const moduleFactory = moduleFactories.get(id);
    if (typeof moduleFactory !== 'function') {
        // This can happen if modules incorrectly handle HMR disposes/updates,
        // e.g. when they keep a `setTimeout` around which still executes old code
        // and contains e.g. a `require("something")` call.
        throw new Error(factoryNotAvailableMessage(id, sourceType, sourceData));
    }
    const module1 = createModuleWithDirection(id);
    const exports = module1.exports;
    moduleCache[id] = module1;
    const context = new Context(module1, exports);
    // NOTE(alexkirsz) This can fail when the module encounters a runtime error.
    try {
        moduleFactory(context, module1, exports);
    } catch (error) {
        module1.error = error;
        throw error;
    }
    ;
    module1.loaded = true;
    if (module1.namespaceObject && module1.exports !== module1.namespaceObject) {
        // in case of a circular dependency: cjs1 -> esm2 -> cjs1
        interopEsm(module1.exports, module1.namespaceObject);
    }
    return module1;
}
/**
 * Retrieves a module from the cache, or instantiate it if it is not cached.
 */ // @ts-ignore
function getOrInstantiateModuleFromParent(id, sourceModule) {
    const module1 = moduleCache[id];
    if (module1) {
        if (module1.error) {
            throw module1.error;
        }
        return module1;
    }
    return instantiateModule(id, SourceType.Parent, sourceModule.id);
}
/**
 * Instantiates a runtime module.
 */ function instantiateRuntimeModule(chunkPath, moduleId) {
    return instantiateModule(moduleId, SourceType.Runtime, chunkPath);
}
/**
 * Retrieves a module from the cache, or instantiate it as a runtime module if it is not cached.
 */ // @ts-ignore TypeScript doesn't separate this module space from the browser runtime
function getOrInstantiateRuntimeModule(chunkPath, moduleId) {
    const module1 = moduleCache[moduleId];
    if (module1) {
        if (module1.error) {
            throw module1.error;
        }
        return module1;
    }
    return instantiateRuntimeModule(chunkPath, moduleId);
}
module.exports = (sourcePath)=>({
        m: (id)=>getOrInstantiateRuntimeModule(sourcePath, id),
        c: (chunkData)=>loadRuntimeChunk(sourcePath, chunkData)
    });


//# sourceMappingURL=%5Bturbopack%5D_runtime.js.map

  function requireChunk(chunkPath) {
    switch(chunkPath) {
      case "server/chunks/ssr/[root-of-the-server]__02svi8c._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__02svi8c._.js");
      case "server/chunks/ssr/[root-of-the-server]__0qv0my8._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__0qv0my8._.js");
      case "server/chunks/ssr/[root-of-the-server]__0slwjcj._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__0slwjcj._.js");
      case "server/chunks/ssr/[root-of-the-server]__10doszd._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__10doszd._.js");
      case "server/chunks/ssr/[turbopack]_runtime.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[turbopack]_runtime.js");
      case "server/chunks/ssr/_next-internal_server_app__not-found_page_actions_0pt47yr.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app__not-found_page_actions_0pt47yr.js");
      case "server/chunks/ssr/app_layout_tsx_2144vk_._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/app_layout_tsx_2144vk_._.js");
      case "server/chunks/ssr/node_modules_1wax83z._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_1wax83z._.js");
      case "server/chunks/ssr/node_modules_next_dist_1n3w9lb._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_1n3w9lb._.js");
      case "server/chunks/ssr/node_modules_next_dist_1v8aef8._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_1v8aef8._.js");
      case "server/chunks/ssr/node_modules_next_dist_client_components_0wpq8j3._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_client_components_0wpq8j3._.js");
      case "server/chunks/ssr/node_modules_next_dist_client_components_builtin_forbidden_0symwr9.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_client_components_builtin_forbidden_0symwr9.js");
      case "server/chunks/ssr/node_modules_next_dist_client_components_builtin_unauthorized_0l_sp0x.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_client_components_builtin_unauthorized_0l_sp0x.js");
      case "server/chunks/ssr/[root-of-the-server]__0xcpjtm._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__0xcpjtm._.js");
      case "server/chunks/ssr/_20pgzh6._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_20pgzh6._.js");
      case "server/chunks/ssr/_next-internal_server_app_admin_page_actions_1mcickz.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_admin_page_actions_1mcickz.js");
      case "server/chunks/ssr/app_admin_page_tsx_1iybnbw._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/app_admin_page_tsx_1iybnbw._.js");
      case "server/chunks/ssr/node_modules_0mb23ob._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_0mb23ob._.js");
      case "server/chunks/ssr/node_modules_0twiba9._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_0twiba9._.js");
      case "server/chunks/ssr/node_modules_1y158z4._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_1y158z4._.js");
      case "server/chunks/ssr/node_modules_next_0x3i8za._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_0x3i8za._.js");
      case "server/chunks/ssr/node_modules_next_dist_client_components_builtin_global-error_0q-w892.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_client_components_builtin_global-error_0q-w892.js");
      case "server/chunks/[root-of-the-server]__0l3yhx4._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__0l3yhx4._.js");
      case "server/chunks/[root-of-the-server]__0qi08e_._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__0qi08e_._.js");
      case "server/chunks/[root-of-the-server]__105ie6o._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__105ie6o._.js");
      case "server/chunks/[turbopack]_runtime.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/[turbopack]_runtime.js");
      case "server/chunks/_next-internal_server_app_api_auth_add-staff_route_actions_19kaxrh.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_auth_add-staff_route_actions_19kaxrh.js");
      case "server/chunks/node_modules_0obde7k._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/node_modules_0obde7k._.js");
      case "server/chunks/node_modules_@sanity_1wt0erv._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/node_modules_@sanity_1wt0erv._.js");
      case "server/chunks/node_modules_@sanity_client_dist__chunks-es_stegaEncodeSourceMap_04csrjk.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/node_modules_@sanity_client_dist__chunks-es_stegaEncodeSourceMap_04csrjk.js");
      case "server/chunks/[root-of-the-server]__0m65rhg._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__0m65rhg._.js");
      case "server/chunks/_next-internal_server_app_api_auth_change-password_route_actions_0dcnj10.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_auth_change-password_route_actions_0dcnj10.js");
      case "server/chunks/node_modules_@sanity_1k3wa0y._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/node_modules_@sanity_1k3wa0y._.js");
      case "server/chunks/[root-of-the-server]__16lac7q._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__16lac7q._.js");
      case "server/chunks/_next-internal_server_app_api_auth_login_route_actions_1ox7zi0.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_auth_login_route_actions_1ox7zi0.js");
      case "server/chunks/node_modules_@sanity_0r3oj8r._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/node_modules_@sanity_0r3oj8r._.js");
      case "server/chunks/[root-of-the-server]__059n5hl._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__059n5hl._.js");
      case "server/chunks/_next-internal_server_app_api_auth_logout_route_actions_0regwyr.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_auth_logout_route_actions_0regwyr.js");
      case "server/chunks/[externals]__0l8ei7u._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/[externals]__0l8ei7u._.js");
      case "server/chunks/_0pct18w._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/_0pct18w._.js");
      case "server/chunks/_next-internal_server_app_api_security-blueprint_route_actions_1y-9k3l.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_security-blueprint_route_actions_1y-9k3l.js");
      case "server/chunks/[root-of-the-server]__0w3cer8._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__0w3cer8._.js");
      case "server/chunks/_next-internal_server_app_api_track_route_actions_0eauih4.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_track_route_actions_0eauih4.js");
      case "server/chunks/[root-of-the-server]__0xojiob._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__0xojiob._.js");
      case "server/chunks/_1haiqiv._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/_1haiqiv._.js");
      case "server/chunks/_next-internal_server_app_api_verify-cert_route_actions_1kil1-h.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_api_verify-cert_route_actions_1kil1-h.js");
      case "server/chunks/ssr/[root-of-the-server]__0-0dl45._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__0-0dl45._.js");
      case "server/chunks/ssr/_next-internal_server_app_boq_page_actions_1a5iaf5.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_boq_page_actions_1a5iaf5.js");
      case "server/chunks/ssr/app_boq_page_tsx_17c_pi7._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/app_boq_page_tsx_17c_pi7._.js");
      case "server/chunks/ssr/node_modules_0rtl60g._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_0rtl60g._.js");
      case "server/chunks/ssr/node_modules_lucide-react_dist_esm_icons_08u8lqh._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_lucide-react_dist_esm_icons_08u8lqh._.js");
      case "server/chunks/ssr/[root-of-the-server]__0n-fir4._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__0n-fir4._.js");
      case "server/chunks/ssr/_1zs8a2c._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_1zs8a2c._.js");
      case "server/chunks/ssr/_next-internal_server_app_card_page_actions_1zdd0vv.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_card_page_actions_1zdd0vv.js");
      case "server/chunks/ssr/[root-of-the-server]__0gqr9y2._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__0gqr9y2._.js");
      case "server/chunks/ssr/_1a31tkg._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_1a31tkg._.js");
      case "server/chunks/ssr/_next-internal_server_app_certificate_page_actions_13xe4di.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_certificate_page_actions_13xe4di.js");
      case "server/chunks/ssr/app_certificate_page_tsx_1o1fftf._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/app_certificate_page_tsx_1o1fftf._.js");
      case "server/chunks/ssr/node_modules_19hzvmi._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_19hzvmi._.js");
      case "server/chunks/ssr/[root-of-the-server]__1a3onng._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__1a3onng._.js");
      case "server/chunks/ssr/[root-of-the-server]__1pj_vih._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__1pj_vih._.js");
      case "server/chunks/ssr/[root-of-the-server]__1vl7z9o._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__1vl7z9o._.js");
      case "server/chunks/ssr/_next-internal_server_app_dashboard_invoices_page_actions_1bk2ib4.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_dashboard_invoices_page_actions_1bk2ib4.js");
      case "server/chunks/ssr/app_dashboard_invoices_page_tsx_054e5d7._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/app_dashboard_invoices_page_tsx_054e5d7._.js");
      case "server/chunks/ssr/node_modules_@sanity_0a55g1e._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_@sanity_0a55g1e._.js");
      case "server/chunks/ssr/node_modules_@sanity_client_dist__chunks-es_stegaEncodeSourceMap_1u86si8.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_@sanity_client_dist__chunks-es_stegaEncodeSourceMap_1u86si8.js");
      case "server/chunks/ssr/node_modules_@sanity_eventsource_19gia9x._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_@sanity_eventsource_19gia9x._.js");
      case "server/chunks/ssr/[root-of-the-server]__1yye9s7._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__1yye9s7._.js");
      case "server/chunks/ssr/_00jg2fx._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_00jg2fx._.js");
      case "server/chunks/ssr/_next-internal_server_app_dashboard_login_page_actions_0qpebwf.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_dashboard_login_page_actions_0qpebwf.js");
      case "server/chunks/[root-of-the-server]__0yydy34._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__0yydy34._.js");
      case "server/chunks/_next-internal_server_app_icon_svg_route_actions_1r2h_ub.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_icon_svg_route_actions_1r2h_ub.js");
      case "server/chunks/ssr/[root-of-the-server]__020mw1c._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__020mw1c._.js");
      case "server/chunks/ssr/[root-of-the-server]__07h9d0x._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__07h9d0x._.js");
      case "server/chunks/ssr/_09k-ti3._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_09k-ti3._.js");
      case "server/chunks/ssr/_16lj8uy._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_16lj8uy._.js");
      case "server/chunks/ssr/_1whndip._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_1whndip._.js");
      case "server/chunks/ssr/_next-internal_server_app_page_actions_0hhsz1j.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_page_actions_0hhsz1j.js");
      case "server/chunks/ssr/components_17d0ixx._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/components_17d0ixx._.js");
      case "server/chunks/ssr/node_modules_@sanity_client_dist__chunks-es_stegaEncodeSourceMap_1wffdy6.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_@sanity_client_dist__chunks-es_stegaEncodeSourceMap_1wffdy6.js");
      case "server/chunks/ssr/14qy_@sanity_ui_dist__chunks-es_refractor_mjs_07jlrw9._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/14qy_@sanity_ui_dist__chunks-es_refractor_mjs_07jlrw9._.js");
      case "server/chunks/ssr/14qy_@sanity_ui_dist__chunks-es_refractor_mjs_1onxedw._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/14qy_@sanity_ui_dist__chunks-es_refractor_mjs_1onxedw._.js");
      case "server/chunks/ssr/1_o__@sanity_ui_dist__chunks-es_refractor_mjs_1cecqmo._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/1_o__@sanity_ui_dist__chunks-es_refractor_mjs_1cecqmo._.js");
      case "server/chunks/ssr/1ob1_@sanity_ui_dist__chunks-es_refractor_mjs_11eme_2._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/1ob1_@sanity_ui_dist__chunks-es_refractor_mjs_11eme_2._.js");
      case "server/chunks/ssr/[root-of-the-server]__0etsmqb._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__0etsmqb._.js");
      case "server/chunks/ssr/[root-of-the-server]__0jdsh8p._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__0jdsh8p._.js");
      case "server/chunks/ssr/[root-of-the-server]__0ko334s._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__0ko334s._.js");
      case "server/chunks/ssr/[root-of-the-server]__10mkn8m._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__10mkn8m._.js");
      case "server/chunks/ssr/[root-of-the-server]__131xz-_._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__131xz-_._.js");
      case "server/chunks/ssr/_1-bjg_6._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_1-bjg_6._.js");
      case "server/chunks/ssr/_next-internal_server_app_studio_[[___tool]]_page_actions_1n313tn.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_studio_[[___tool]]_page_actions_1n313tn.js");
      case "server/chunks/ssr/node_modules_0rtr-qr._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_0rtr-qr._.js");
      case "server/chunks/ssr/node_modules_1nyy1um._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_1nyy1um._.js");
      case "server/chunks/ssr/node_modules_@sanity_prism-groq_groq_070j3zb.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_@sanity_prism-groq_groq_070j3zb.js");
      case "server/chunks/ssr/node_modules_@sanity_vision_lib__chunks-es_resources_20-41_0.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_@sanity_vision_lib__chunks-es_resources_20-41_0.js");
      case "server/chunks/ssr/node_modules_next-sanity_dist_NextStudio_00he8yd.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next-sanity_dist_NextStudio_00he8yd.js");
      case "server/chunks/ssr/node_modules_react-refractor_dist_index_1am81ma.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_react-refractor_dist_index_1am81ma.js");
      case "server/chunks/ssr/node_modules_refractor_lang_0auyvcq._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_refractor_lang_0auyvcq._.js");
      case "server/chunks/ssr/node_modules_refractor_lang_0z431l7._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_refractor_lang_0z431l7._.js");
      case "server/chunks/ssr/node_modules_refractor_lang_bash_0mnajux.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_refractor_lang_bash_0mnajux.js");
      case "server/chunks/ssr/node_modules_refractor_lang_javascript_0rh5p3o.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_refractor_lang_javascript_0rh5p3o.js");
      case "server/chunks/ssr/node_modules_refractor_lang_json_0g-w26l.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_refractor_lang_json_0g-w26l.js");
      case "server/chunks/ssr/node_modules_sanity_lib__chunks-es_VideoPlayer_0xxmc7e.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_sanity_lib__chunks-es_VideoPlayer_0xxmc7e.js");
      case "server/chunks/ssr/node_modules_sanity_lib__chunks-es_ViteDevServerStopped_0e8c9og.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_sanity_lib__chunks-es_ViteDevServerStopped_0e8c9og.js");
      case "server/chunks/ssr/node_modules_sanity_lib__chunks-es_index2_0_5-hun.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_sanity_lib__chunks-es_index2_0_5-hun.js");
      case "server/chunks/ssr/node_modules_sanity_lib__chunks-es_index3_0eao2ew.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_sanity_lib__chunks-es_index3_0eao2ew.js");
      case "server/chunks/ssr/node_modules_sanity_lib__chunks-es_index4_1gs2txw.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_sanity_lib__chunks-es_index4_1gs2txw.js");
      case "server/chunks/ssr/node_modules_sanity_lib__chunks-es_pane2_1az7ikm.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_sanity_lib__chunks-es_pane2_1az7ikm.js");
      case "server/chunks/ssr/node_modules_sanity_lib__chunks-es_pane_0_492-t.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_sanity_lib__chunks-es_pane_0_492-t.js");
      case "server/chunks/ssr/node_modules_sanity_lib__chunks-es_resources2_0zk-_n2.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_sanity_lib__chunks-es_resources2_0zk-_n2.js");
      case "server/chunks/ssr/node_modules_sanity_lib__chunks-es_resources3_02ivscz.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_sanity_lib__chunks-es_resources3_02ivscz.js");
      case "server/chunks/ssr/node_modules_sanity_lib__chunks-es_resources4_16ycokv.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_sanity_lib__chunks-es_resources4_16ycokv.js");
      case "server/chunks/ssr/node_modules_sanity_lib__chunks-es_resources5_0q25i0f.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_sanity_lib__chunks-es_resources5_0q25i0f.js");
      case "server/chunks/ssr/node_modules_sanity_lib__chunks-es_resources6_1do1oy2.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_sanity_lib__chunks-es_resources6_1do1oy2.js");
      case "server/chunks/ssr/node_modules_sanity_lib__chunks-es_resources7_1fakop3.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_sanity_lib__chunks-es_resources7_1fakop3.js");
      case "server/chunks/ssr/node_modules_sanity_lib__chunks-es_resources8_1u5e-yf.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_sanity_lib__chunks-es_resources8_1u5e-yf.js");
      case "server/chunks/ssr/node_modules_sanity_lib__chunks-es_resources_1hn2en4.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_sanity_lib__chunks-es_resources_1hn2en4.js");
      case "server/chunks/ssr/node_modules_sanity_lib__chunks-es_structureTool_03xxxeg.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_sanity_lib__chunks-es_structureTool_03xxxeg.js");
      case "server/chunks/ssr/[root-of-the-server]__11tnj-n._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__11tnj-n._.js");
      case "server/chunks/ssr/_1xzo9m-._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_1xzo9m-._.js");
      case "server/chunks/ssr/_216cj5d._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_216cj5d._.js");
      case "server/chunks/ssr/_next-internal_server_app_verify_page_actions_1nl0axq.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_verify_page_actions_1nl0axq.js");
      case "server/chunks/ssr/[root-of-the-server]__1io3bae._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__1io3bae._.js");
      case "server/chunks/ssr/[root-of-the-server]__1woom8m._.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__1woom8m._.js");
      case "server/chunks/ssr/_next-internal_server_app__global-error_page_actions_0zi5s8-.js": return require("C:/Users/PC/OneDrive/Desktop/NEW_BAYTLOGIC/baytlogic-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app__global-error_page_actions_0zi5s8-.js");
      default:
        throw new Error(`Not found ${chunkPath}`);
    }
  }


  async function loadWasmChunk(chunkPath) {
    switch (chunkPath) {

      default:
        throw new Error(`Unknown wasm chunk: ${chunkPath}`);
    }
  }
