import { CookieJar } from "tough-cookie";

declare module "curl-wrap" {
  interface CurlOptions {
    method?: string; // HTTP method (e.g., GET, POST)
    headers?: Record<string, string>; // Request headers
    body?: string | object | null; // Request body
    timeout?: number; // Timeout in milliseconds
    [key: string]: any; // Allow additional options
  }

  interface CurlResponse {
    url: string;
    body: string; // Response body as a string
    headers: Record<string, string>; // Response headers
    statusCode: number; // HTTP status code
    status: number; // alias for .statusCode
    ip: string;
    errorMsg: string;
  }

  export function curl(
    url: string,
    options?: CurlOptions
  ): Promise<CurlResponse>;

  type BrowserType = "chrome" | "edge" | "chromeMobile" | "firefox" | "safari";

  export class Curl {
    constructor();

    url(url: string): Curl;
    static url(url: string): Curl;

    get(url: string): Curl;
    static get(url: string): Curl;

    post(url: string): Curl;
    static post(url: string): Curl;

    put(url: string): Curl;
    static put(url: string): Curl;

    static getNewCookieJar(...args: any[]): CookieJar;
    static getGlobalCookieJar(): CookieJar;

    static hasCurlImpersonateChrome(): boolean;
    static hasCurlImpersonateFirefox(): boolean;

    cliCommand(command: string): Curl;
    cliOptions(options: string | string[]): Curl;

    impersonate(browser?: BrowserType): Curl;

    followRedirect(shouldFollowRedirect?: boolean): Curl;
    maxRedirects(numRedirects: number): Curl;

    header(headerName: string | object, headerValue?: string): Curl;
    headers(headers: object): Curl;

    json(body?: object): Curl;
    body(body: any, contentType?: string): Curl;

    referer(referer: string): Curl;
    referrer(referrer: string): Curl;

    userAgent(userAgent: string): Curl;
    contentType(contentType: string): Curl;

    isJSON(): boolean;
    isForm(): boolean;

    cookie(cookieName: string | boolean | object, cookieValue?: string): Curl;
    cookies(cookies: object | boolean): Curl;

    globalCookies(options?: boolean | object): Curl;
    cookieJar(cookieJar: CookieJar, options?: { readOnly?: boolean }): Curl;
    cookieFile(fileName: string, options?: object): Curl;

    timeout(timeout: number): Curl;
    timeoutMs(timeoutInMs: number): Curl;

    field(fieldName: string | object, fieldValue?: string): Curl;
    fields(fields: object): Curl;

    query(name: string | object, value?: string): Curl;
    compress(askForCompression?: boolean): Curl;

    method(method: string): Curl;

    httpAuth(
      username: string | { username: string; password: string },
      password?: string
    ): Curl;
    bearerToken(token: string): Curl;
    apiToken(token: string): Curl;

    useProxy(shouldUseProxy?: boolean): Curl;
    proxy(proxy: string | object, options?: object): Curl;

    keepalive(isKeepAlive?: boolean): Curl;

    get(): Curl;
    post(): Curl;
    put(): Curl;

    verbose(isVerbose?: boolean): Curl;

    fetch(): Promise<CurlResponse>;

    then(
      successCallback: (response: any) => CurlResponse,
      errorCallback?: (error: Error) => CurlResponse
    ): Promise<CurlResponse>;

    catch(errorCallback: (error: Error) => CurlResponse): Promise<CurlResponse>;

    finally(callback: () => CurlResponse): Promise<CurlResponse>;

    // Additional properties for options or cookie jars
    private options: any;
    private _fields: Record<string, any>;
    private _query: Record<string, any>;
  }
}
