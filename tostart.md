npm init -y

npm install -D @types/lodash@3.10.1 @type/screeps-arena

`src` => main.js

npm install -D rollup

`package.json`

    "scripts": {
      "build": "rollup -cw",
      "test": "echo \"Error: no test specified\" && exit 1"
    },

`rollup.config.js`

    // 告诉 rollup 他要打包什么
    export default {
        // 源代码的入口是哪个文件
        input: 'src/main.js',
        // 构建产物配置
        output: {
            // 输出到哪个文件
            file: 'dist/main.js',
            format: 'cjs',
            sourcemap: true
        }
    };

npm run build

npm install rollup-plugin-clear rollup-plugin-screeps rollup-plugin-copy -D

`.secret.json`

    {
        "main": {
            "token": "你的 screeps token 填在这里",
            "protocol": "https",
            "hostname": "screeps.com",
            "port": 443,
            "path": "/",
            "branch": "default"
        },
        "local": {
            "copyPath": "你要上传到的游戏路径，例如 C:\\Users\\DELL\\AppData\\Local\\Screeps\\scripts\\screeps.com\\default"
        }
    }

获取token[https://screeps.com/a/#!/account/auth-tokens]

`package.json`

    "scripts": {
    "push": "rollup -cw --environment DEST:main",
    "local": "rollup -cw --environment DEST:local",
    ...
    },

**npm run push**

npm install source-map@0.6.1

`src/modules/errorMapper.js`

    /**
    * 校正异常的堆栈信息
    * 
    * 由于 rollup 会打包所有代码到一个文件，所以异常的调用栈定位和源码的位置是不同的
    * 本模块就是用来将异常的调用栈映射至源代码位置
    * 
    * @see https://github.com/screepers/screeps-typescript-starter/blob/master/src/utils/ErrorMapper.ts
    */

    import { SourceMapConsumer } from 'source-map'

    // 缓存 SourceMap
    let consumer = null
    
    // 第一次报错时创建 sourceMap
    const getConsumer = function () {
        if (consumer == null) consumer = new SourceMapConsumer(require("main.js.map"))
        return consumer
    }
    
    // 缓存映射关系以提高性能
    const cache = {}
 
    /**
    * 使用源映射生成堆栈跟踪，并生成原始标志位
    * 警告 - global 重置之后的首次调用会产生很高的 cpu 消耗 (> 30 CPU)
    * 之后的每次调用会产生较低的 cpu 消耗 (~ 0.1 CPU / 次)
    *
    * @param {Error | string} error 错误或原始追踪栈
    * @returns {string} 映射之后的源代码追踪栈
    */
    const sourceMappedStackTrace = function (error) {
        const stack = error instanceof Error ? error.stack : error
        // 有缓存直接用
        if (cache.hasOwnProperty(stack)) return cache[stack]
    
        const re = /^\s+at\s+(.+?\s+)?\(?([0-z._\-\\\/]+):(\d+):(\d+)\)?$/gm
        let match
        let outStack = error.toString()
        console.log("ErrorMapper -> sourceMappedStackTrace -> outStack", outStack)
    
        while ((match = re.exec(stack))) {
            // 解析完成
            if (match[2] !== "main") break
            
            // 获取追踪定位
            const pos = getConsumer().originalPositionFor({
                column: parseInt(match[4], 10),
                line: parseInt(match[3], 10)
            })
    
            // 无法定位
            if (!pos.line) break
            
            // 解析追踪栈
            if (pos.name) outStack += `\n    at ${pos.name} (${pos.source}:${pos.line}:${pos.column})`
            else {
                // 源文件没找到对应文件名，采用原始追踪名
                if (match[1]) outStack += `\n    at ${match[1]} (${pos.source}:${pos.line}:${pos.column})`
                // 源文件没找到对应文件名并且原始追踪栈里也没有，直接省略
                else outStack += `\n    at ${pos.source}:${pos.line}:${pos.column}`
            }
        }
    
        cache[stack] = outStack
        return outStack
    }
    
    /**
    * 错误追踪包装器
    * 用于把报错信息通过 source-map 解析成源代码的错误位置
    * 和原本 wrapLoop 的区别是，wrapLoop 会返回一个新函数，而这个会直接执行
    * 
    * @param next 玩家代码
    */
    export const errorMapper = function (next) {
        return () => {
            try {
                // 执行玩家代码
                next()
            }
            catch (e) {
                if (e instanceof Error) {
                    // 渲染报错调用栈，沙盒模式用不了这个
                    const errorMessage = Game.rooms.sim ?
                        `沙盒模式无法使用 source-map - 显示原始追踪栈<br>${_.escape(e.stack)}` :
                        `${_.escape(sourceMappedStackTrace(e))}`
                    
                    console.log(`<text style="color:#ef9a9a">${errorMessage}</text>`)
                }
                // 处理不了，直接抛出
                else throw e
            }
        }
    }

npm install -D @rollup/plugin-node-resolve @rollup/plugin-commonjs

`rollup.config.js`

    // 在代码头部引入包
    import resolve from '@rollup/plugin-node-resolve'
    import commonjs from '@rollup/plugin-commonjs'

    // ...

    // 在 plugins 中调用插件
    export default {
        // ...
        plugins: [
            // 清除上次编译成果
            clear({ targets: ["dist"] }),
            // 打包依赖
            resolve(),
            // 模块化依赖
            commonjs(),
            // 执行上传或者复制
            pluginDeploy
        ]
    };

`tsconfig.json`

    {
        "compilerOptions": {
            "target": "es2017",
            "moduleResolution": "Node", 
            "outDir": "dist/",
            "baseUrl": "./",
            "sourceMap": true,
            "allowSyntheticDefaultImports": true,
            "paths": {
                "@/*": ["./src/*"]
            }
        },
        "exclude": [
            "node_modules"
        ],
        "include": [
            "src/**/*.ts"
        ]
    }

npm install --save-dev typescript rollup-plugin-typescript2 

`rollup.config.js`

    import typescript from 'rollup-plugin-typescript2' // <== 新增这一行

    export default {
        input: 'src/main.ts', // <== 把这里的 main.js 改为 main.ts
        output: {
            file: 'dist/main.js', // <== 这里不用修改，因为我们的输出还是 js 文件
            // ...
        },
        // ...
    };

    export default {
        input: 'src/main.ts',
        // ...
        plugins: [
            // ...
            // 模块化依赖
            commonjs(),
            // 编译 ts
            typescript({ tsconfig: "./tsconfig.json" }), // <== 新增这一行，注意先后顺序不要搞错了
            // 执行上传或者复制
            pluginDeploy
        ]
    };

`src/index.d.ts`

    interface CreepMemory {
        /**
        * 该 creep 的角色
        */
        role: string
    }