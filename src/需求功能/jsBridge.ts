type CallBack = (res?: any) => void;
type CBSet = Set<CallBack>;
export interface Payload {
  params: Record<string, any> | undefined;
  successCB: (res: any) => void;
  failCB: (err: any) => void;
}

interface MethodConfig {
  isHandlerEnv: () => boolean;
  handler(payload: Payload): void;
}

export interface MethodsConfig {
  [propName: string]: MethodConfig | undefined;
}

class JsBridge {
  private registerMap: Map<string, CBSet>;
  private methodsConfig: MethodsConfig;
  constructor(methodsConfig: MethodsConfig) {
    this.registerMap = new Map();
    this.methodsConfig = methodsConfig;
  }

  /**
   * @description js调用APP的方法
   * @param {string} name -  native 方法名
   * @param {object} params - 调用方法时需要的参数，可选
   * @return {promise} 返回 Promise 对象
   */
  invoke(name: string, params?: Payload["params"]): Promise<any> {
    return new Promise((resolve, reject) => {
      const payload: Payload = {
        params,
        successCB(res) {
          resolve(res);
        },
        failCB(err) {
          reject(err);
        }
      };

      const method = this.methodsConfig[name];
      if (!method) return reject(`未找到 ${name} 方法`);
      if (!method.isHandlerEnv()) return reject(`当前环境不支持 ${name} 方法`);

      try {
        method.handler(payload);
        console.log(`调用 ${name} 方法`);
      } catch (err) {
        reject(`调用 ${name} 方法失败: ${err}`);
      }
    });
  }

  // 注册供APP调用的方法，可注册多个同名方法
  register(name: string, callback: CallBack): void {
    let cbSet = this.registerMap.get(name);
    if (!cbSet) {
      cbSet = new Set<CallBack>();
      this.registerMap.set(name, cbSet);
    }
    cbSet.add(callback);

    //  注册到全局
    window[name] = (res: any) => {
      for (const cb of cbSet) {
        cb(res);
      }
    };
  }

  // 单例模式
  static instance: JsBridge | null = null;
  static getInstance(methodsConfig: MethodsConfig): JsBridge {
    if (!JsBridge.instance) {
      JsBridge.instance = new JsBridge(methodsConfig);
    }
    return JsBridge.instance;
  }
}
