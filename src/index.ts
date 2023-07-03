import { ACCEPTED, BAD_REQUEST, CREATED, FORBIDDEN, FOUND, INTERNAL_SERVER_ERROR, MOVED_PERMANENTLY, NOT_FOUND, NOT_MODIFIED, NO_CONTENT, OK, PERMANENT_REDIRECT, SEE_OTHER, TEMPORARY_REDIRECT, UNAUTHORIZED, USE_PROXY } from '@redmunroe/net-http';

type headers = Map<string, string>;

type LambdaResponse = {
    statusCode: number,
    headers: headers,
    body: string | undefined
}

export default class Lambda {
    status: number = 0; 
    headers: headers; 
    body: object | undefined = undefined; 
    json: boolean = false;

    OK(): Lambda {
        return this.Status(OK)
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
        return {
            statusCode: this.status,
            headers: this.headers,
            body: this.json ? JSON.stringify(this.body) : undefined
        }
    }
}