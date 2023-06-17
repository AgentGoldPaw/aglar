export default class Lambda {

    status = 0; 
    headers = {}; 
    body = null; 

    OK() {
        this.status = 200;
        return this;
    }

    BadRequest() {
        this.status = 400;
        return this;
    }

    InternalServerError() {
        this.status = 500;
        return this;
    }

    NotFound() {
        this.status = 404;
        return this;
    }

    Unauthorized() {
        this.status = 401;
        return this;
    }

    Forbidden() {
        this.status = 403;
        return this;
    }

    NoContent() {
        this.status = 204;
        return this;
    }

    Created() {
        this.status = 201;
        return this;
    }

    Accepted() {
        this.status = 202;
        return this;
    }

    MovedPermanently() {
        this.status = 301;
        return this;
    }

    Found() {
        this.status = 302;
        return this;
    }

    SeeOther() {
        this.status = 303;
        return this;
    }

    NotModified() {
        this.status = 304;
        return this;
    }

    UseProxy() {
        this.status = 305;
        return this;
    }

    TemporaryRedirect() {
        this.status = 307;
        return this;
    }

    PermanentRedirect() {
        this.status = 308;
        return this;
    }

    Status(status) {
        this.status = status;
        return this;
    }

    headers(headers) {
        this.headers = headers;
        return this;
    }

    header(key, value) {
        this.headers[key] = value;
        return this;
    }

    body(body) {
        this.body = body;
        return this;
    }

    JSON(body) {
        this.header('Content-Type', 'application/json'); 
        this.body = JSON.stringify(body);
        return this;
    }

    send() {
        return {
            statusCode: this.status,
            headers: this.headers,
            body: this.body
        }
    }
}