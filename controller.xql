xquery version "3.1";

import module namespace login="http://exist-db.org/xquery/login" at "resource:org/exist/xquery/modules/persistentlogin/login.xql";

declare namespace output = "http://www.w3.org/2010/xslt-xquery-serialization";
declare option output:method "html5";
declare option output:media-type "text/html";

declare variable $exist:path external;
declare variable $exist:resource external;
declare variable $exist:controller external;
declare variable $exist:prefix external;
declare variable $exist:root external;

if ($exist:path eq '') then
    <dispatch xmlns="http://exist.sourceforge.net/NS/exist">
        <redirect url="{request:get-uri()}/"/>
    </dispatch>
else if ($exist:path = "/") then(
    <dispatch xmlns="http://exist.sourceforge.net/NS/exist">
        <redirect url="index.html"/>
    </dispatch>
)
(:
 : Login a user via AJAX. Just returns a 401 if login fails.
 :)
else if ($exist:resource eq 'login') then
    let $loggedIn := login:set-user("org.exist.login", xs:dayTimeDuration("P7D"), false())
    let $user := request:get-attribute("org.exist.login.user")
    return (
        util:declare-option("exist:serialize", "method=json"),
        try {
            <status xmlns:json="http://www.json.org">
                <user>{$user}</user>
                {
                    if ($user) then (
                        for $item in sm:get-user-groups($user) return <groups json:array="true">{$item}</groups>,
                        <dba>{sm:is-dba($user)}</dba>
                    ) else
                        ()
                }
            </status>
        } catch * {
            response:set-status-code(401),
            <status>{$err:description}</status>
        }
    )

(: Admin dashboard :)
else if ($exist:path = "/admin") then (
    login:set-user("org.exist.login", xs:dayTimeDuration("P7D"), true()),
    let $user := request:get-attribute("org.exist.login.user")
    let $route := request:get-parameter("route","")
    return
    if($user and sm:is-dba($user)) then
        <dispatch xmlns="http://exist.sourceforge.net/NS/exist">
            <forward url="admin.xql?route={$route}">
                <cache-control cache="no"/>
                <set-header name="Cache-Control" value="no-cache"/>
            </forward>
        </dispatch>
    else
        <dispatch xmlns="http://exist.sourceforge.net/NS/exist">
          <redirect url="index.html"/>
        </dispatch>
)

(: User Manager API - forward to modules/usermanager :)
else if (starts-with($exist:path, "/usermanager/")) then (
    login:set-user("org.exist.login", xs:dayTimeDuration("P7D"), true()),
    let $user := request:get-attribute("org.exist.login.user")
    return
    if ($user and sm:is-dba($user)) then
        <dispatch xmlns="http://exist.sourceforge.net/NS/exist">
            <forward url="modules/usermanager/controller.xql">
                <set-header name="Cache-Control" value="no-cache"/>
            </forward>
        </dispatch>
    else (
        response:set-status-code(403),
        <dispatch xmlns="http://exist.sourceforge.net/NS/exist">
            <ignore/>
        </dispatch>
    )
)

(: Backup API - forward to modules/backup :)
else if (starts-with($exist:path, "/backup/")) then (
    login:set-user("org.exist.login", xs:dayTimeDuration("P7D"), true()),
    let $user := request:get-attribute("org.exist.login.user")
    return
    if ($user and sm:is-dba($user)) then
        <dispatch xmlns="http://exist.sourceforge.net/NS/exist">
            <forward url="modules/backup/controller.xql">
                <set-header name="Cache-Control" value="no-cache"/>
            </forward>
        </dispatch>
    else (
        response:set-status-code(403),
        <dispatch xmlns="http://exist.sourceforge.net/NS/exist">
            <ignore/>
        </dispatch>
    )
)

(: Static resources and everything else :)
else
    <dispatch xmlns="http://exist.sourceforge.net/NS/exist">
        <cache-control cache="yes"/>
    </dispatch>
