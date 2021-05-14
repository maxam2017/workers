# url-shortener

## Example
```bash
$ curl -v http://url-shortener.maxam.workers.dev/shorten --data "url=https://example.com"
*   Trying 172.67.201.69...
* TCP_NODELAY set
* Connected to url-shortener.maxam.workers.dev (172.67.201.69) port 80 (#0)
> POST /shorten HTTP/1.1
> Host: url-shortener.maxam.workers.dev
> User-Agent: curl/7.64.1
> Accept: */*
> Content-Length: 23
> Content-Type: application/x-www-form-urlencoded
>
* upload completely sent off: 23 out of 23 bytes
< HTTP/1.1 200 OK
< Date: Fri, 14 May 2021 13:37:42 GMT
< Content-Type: application/json;charset=UTF-8
< Content-Length: 74
< Connection: keep-alive
< Access-Control-Allow-Origin: *
< Cache-Control: s-maxage=60, stale-while-revalidate
< cf-request-id: 0a0cb1f1d30000f08d8388c000000001
< Report-To: {"endpoints":[{"url":"https:\/\/a.nel.cloudflare.com\/report?s=9wPU2wpjLjZAGafCnUlz1gVTPT17EjBeoXJ4QqIHsy%2BeMNfy4%2Bgye4MQx%2FcA1uFHh84PiEI5UBlaPhVkeV%2FmUnl5bCAGhkeGSom3pgfmPxLM3lV3EeYftkj3YiRpYZPd"}],"group":"cf-nel","max_age":604800}
< NEL: {"report_to":"cf-nel","max_age":604800}
< Server: cloudflare
< CF-RAY: 64f485c95ef8f08d-TPE
< alt-svc: h3-27=":443"; ma=86400, h3-28=":443"; ma=86400, h3-29=":443"; ma=86400
<
* Connection #0 to host url-shortener.maxam.workers.dev left intact
{"id":"745b66fbe22ecc00","url":"https://example.com","hash":"CeCNTdhQw9j"}* Closing connection 0
```

```bash
➜ curl -v http://url-shortener.maxam.workers.dev/recovery --data "hash=CeCNTdhQw9j"
*   Trying 172.67.201.69...
* TCP_NODELAY set
* Connected to url-shortener.maxam.workers.dev (172.67.201.69) port 80 (#0)
> POST /recovery HTTP/1.1
> Host: url-shortener.maxam.workers.dev
> User-Agent: curl/7.64.1
> Accept: */*
> Content-Length: 16
> Content-Type: application/x-www-form-urlencoded
>
* upload completely sent off: 16 out of 16 bytes
< HTTP/1.1 200 OK
< Date: Fri, 14 May 2021 13:38:01 GMT
< Content-Type: text/plain;charset=UTF-8
< Content-Length: 53
< Connection: keep-alive
< Cache-Control: s-maxage=60, stale-while-revalidate
< cf-request-id: 0a0cb23ec600000758a3057000000001
< Report-To: {"endpoints":[{"url":"https:\/\/a.nel.cloudflare.com\/report?s=qV29bR1UM6sIE5BWCcFvZ7FvNrXELjfTFSQB10HV%2FgTjS%2FZG34OT6Y1TVzzVQ4HeCNOr%2FQEG7AU%2BBbgyHV3c7oTeKdtOgG4XyqbNX4HRcpNF6gN6NlZ7%2B7DyW7PHKrBF"}],"group":"cf-nel","max_age":604800}
< NEL: {"report_to":"cf-nel","max_age":604800}
< Server: cloudflare
< CF-RAY: 64f486447da20758-TPE
< alt-svc: h3-27=":443"; ma=86400, h3-28=":443"; ma=86400, h3-29=":443"; ma=86400
<
* Connection #0 to host url-shortener.maxam.workers.dev left intact
{"id":"745b66fbe22ecc00","url":"https://example.com"}* Closing connection 0
```
