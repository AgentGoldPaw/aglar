import { ACCEPTED, BAD_REQUEST, CREATED, FORBIDDEN, FOUND, INTERNAL_SERVER_ERROR, MOVED_PERMANENTLY, NOT_FOUND, NOT_MODIFIED, NO_CONTENT, OK, PERMANENT_REDIRECT, SEE_OTHER, TEMPORARY_REDIRECT, UNAUTHORIZED, USE_PROXY } from '@redmunroe/net-http';

type headers = Map<string, string>;

type LambdaResponse = {
    statusCode: number,
    headers: headers,
    body: string | undefined
}

// `Access-Control-Allow-Origin` – Provided that the `Origin` request header matches your access list then this header should reflect that request header's content.

// Access-Control-Allow-Credentials – This header is a boolean indicating to the browser whether or not it is acceptable for code from this Origin to send authentication credentials such as cookies or Authorization headers.

// Access-Control-Expose-Headers – This is a comma-separated list that indicates to the browser which headers from the server's response to the actual request should be exposed to the script making the request.

// Access-Control-Max-Age – The max-age header indicates how long the browser should retain the response to this cross-origin request's preflight check in its cache to reduce the overhead of future cross-origin requests.

// Access-Control-Allow-Methods – This header lists all of the methods that scripts coming from the (sub)domain stated in the Origin header should be allowed to make.

// Access-Control-Allow-Headers – If the preflight request contains an `Access-Control-Request-Header` then this header should either reflect that content to the browser or respond with a wildcard.

export class CORS {
     origins: string[] = [];
     methods: string[] = [];
     headers: string[] = [];
     credentials: boolean = false;
     maxAge: number = 0;
    exposedHeaders: string[] = [];

    constructor() {
    }

    allowOrigin(origin: string): CORS {
        this.origins.push(origin);
        return this;
    }

    allowMethod(method: string): CORS {
        this.methods.push(method);
        return this;
    }

    allowHeader(header: string): CORS {
        this.headers.push(header);
        return this;
    }

    allowCredentials(): CORS {
        this.credentials = true;
        return this;
    }

    allowMaxAge(maxAge: number): CORS {
        this.maxAge = maxAge;
        return this;
    }

    exposeHeader(header: string): CORS {
        this.exposedHeaders.push(header);
        return this;
    }
}

export default class Lambda {
    status: number = 0; 
    headers: headers; 
    body: object | undefined = undefined; 
    json: boolean = false;
    cors: CORS | undefined = undefined;
    OK(): Lambda {
        return this.Status(OK)
    }

    setCORS(cors: CORS): Lambda {
        this.cors = cors;
        return this;
    }

    BadRequest(): Lambda {
        return this.Status(BAD_REQUEST)
    }

    InternalServerError(): Lambda {
        return this.Status(INTERNAL_SERVER_ERROR);
    }

    NotFound(): Lambda {
        return this.Status(NOT_FOUND)
    }

    Unauthorized(): Lambda {
        return this.Status(UNAUTHORIZED)
    }

    Forbidden(): Lambda {
        return this.Status(FORBIDDEN)
    }

    NoContent(): Lambda {
        return this.Status(NO_CONTENT)
    }

    Created(): Lambda {
        return this.Status(CREATED)
    }

    Accepted(): Lambda {
        return this.Status(ACCEPTED)
    }

    MovedPermanently(): Lambda {
        return this.Status(MOVED_PERMANENTLY)
    }

    Found(): Lambda {
        return this.Status(FOUND)
    }

    SeeOther(): Lambda {
        return this.Status(SEE_OTHER)
    }

    NotModified(): Lambda {
        return this.Status(NOT_MODIFIED)
    }

    UseProxy(): Lambda {
        return this.Status(USE_PROXY)
    }

    TemporaryRedirect(): Lambda {
        return this.Status(TEMPORARY_REDIRECT)
    }

    PermanentRedirect(): Lambda {
        return this.Status(PERMANENT_REDIRECT)
    }

    private Status(status): Lambda {
        this.status = status;
        return this;
    }

    setHeaders(headers: object): Lambda {
        this.headers = new Map(Object.entries(headers));
        return this;
    }

    header(key: string, value: string): Lambda {
        this.headers.set(key, value);
        return this;
    }

    setBody(body: object): Lambda {
        this.body = body;
        return this;
    }

    JSON(body: object): Lambda {
        this.header('Content-Type', 'application/json'); 
        this.body = body
        this.json = true;
        return this;
    }

    send(): LambdaResponse {
        if (this.cors) {
            // simplify this some how
            this.headers.set('Access-Control-Allow-Origin', this.cors.origins.join(','));
            this.headers.set('Access-Control-Allow-Methods', this.cors.methods.join(','));
            this.headers.set('Access-Control-Allow-Headers', this.cors.headers.join(','));
            this.headers.set('Access-Control-Allow-Credentials', this.cors.credentials ? 'true' : 'false');
            this.headers.set('Access-Control-Max-Age', this.cors.maxAge.toString());
            this.headers.set('Access-Control-Expose-Headers', this.cors.exposedHeaders.join(','));
        }
        return {
            statusCode: this.status,
            headers: this.headers,
            body: this.json ? JSON.stringify(this.body) : undefined
        }
    }
}