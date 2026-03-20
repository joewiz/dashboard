xquery version "3.1";

declare namespace output = "http://www.w3.org/2010/xslt-xquery-serialization";
declare option output:method "html5";
declare option output:media-type "text/html";

let $route := request:get-parameter("route","#/launcher")

return
<html>
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes"/>
    <title>existdb-dashboard</title>
    <link rel="stylesheet" href="resources/styles.css"/>
    <script type="module" src="dist/admin.js">/* */</script>
</head>
<body>
    <existdb-dashboard path="{$route}"> </existdb-dashboard>
</body>
</html>
