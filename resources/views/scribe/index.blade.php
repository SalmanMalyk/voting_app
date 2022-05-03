<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>Erie Api Documentation</title>

    <link href="https://fonts.googleapis.com/css?family=PT+Sans&display=swap" rel="stylesheet">

        <link rel="stylesheet" href="{{ asset("vendor/scribe/css/style.css") }}" media="screen" />
        <link rel="stylesheet" href="{{ asset("vendor/scribe/css/print.css") }}" media="print" />
        <script src="{{ asset("vendor/scribe/js/all.js") }}"></script>

        <link rel="stylesheet" href="{{ asset("vendor/scribe/css/highlight-darcula.css") }}" media="" />
        <script src="{{ asset("vendor/scribe/js/highlight.pack.js") }}"></script>
    <script>hljs.initHighlightingOnLoad();</script>

</head>

<body class="" data-languages="[&quot;bash&quot;,&quot;javascript&quot;]">
<a href="#" id="nav-button">
      <span>
        NAV
            <img src="{{ asset("vendor/scribe/images/navbar.png") }}" alt="-image" class=""/>
      </span>
</a>
<div class="tocify-wrapper">
        <img src="../assets/media/logo/erie-logo.png" alt="logo" class="logo" style="padding-top: 10px;" width="230px"/>
                <div class="lang-selector">
                            <a href="#" data-language-name="bash">bash</a>
                            <a href="#" data-language-name="javascript">javascript</a>
                    </div>
        <div class="search">
        <input type="text" class="search" id="input-search" placeholder="Search">
    </div>
    <ul class="search-results"></ul>

    <ul id="toc">
    </ul>

            <ul class="toc-footer" id="toc-footer">
                            <li><a href="{{ route("scribe.postman") }}">View Postman collection</a></li>
                            <li><a href="{{ route("scribe.openapi") }}">View OpenAPI (Swagger) spec</a></li>
                            <li><a href='http://github.com/knuckleswtf/scribe'>Documentation powered by Scribe ✍</a></li>
                    </ul>
            <ul class="toc-footer" id="last-updated">
            <li>Last updated: October 6 2021</li>
        </ul>
</div>
<div class="page-wrapper">
    <div class="dark-box"></div>
    <div class="content">
        <h1>Introduction</h1>
<p>This documentation aims to provide all the information you need to work with our API.</p>
<aside>As you scroll, you'll see code examples for working with the API in different programming languages in the dark area to the right (or as part of the content on mobile).
You can switch the language used with the tabs at the top right (or from the nav menu at the top left on mobile).</aside>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.10/lodash.min.js"></script>
<script>
    var baseUrl = "http://localhost:8000";
</script>
<script src="{{ asset("vendor/scribe/js/tryitout-2.7.10.js") }}"></script>
<blockquote>
<p>Base URL</p>
</blockquote>
<pre><code class="language-yaml">http://localhost:8000</code></pre><h1>Authenticating requests</h1>
<p>This API is not authenticated.</p><h1>Dispatcher API</h1>
<p>API endpoints for managing dispatcher app</p>
<h2>Dispatcher Login API.</h2>
<p>check if dispatcher info is correct. If valid credentials are endtered, returned auth token.</p>
<p>Otherwise, returned error message accordingly.</p>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X POST \
    "https://dev.erie.pk/api/v1/dispatcher/login" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"email":"testuser@example.com","password":"secret"}'
</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "https://dev.erie.pk/api/v1/dispatcher/login"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "email": "testuser@example.com",
    "password": "secret"
}

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre>
<blockquote>
<p>Example response (200):</p>
</blockquote>
<pre><code class="language-json">
{
 "access_token": "eyJ0eXA...",
 "user": "{
     "id": 1,
     "name": "John Doe"
 }",
}</code></pre>
<div id="execution-results-POSTapi-v1-dispatcher-login" hidden>
    <blockquote>Received response<span id="execution-response-status-POSTapi-v1-dispatcher-login"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-v1-dispatcher-login"></code></pre>
</div>
<div id="execution-error-POSTapi-v1-dispatcher-login" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-v1-dispatcher-login"></code></pre>
</div>
<form id="form-POSTapi-v1-dispatcher-login" data-method="POST" data-path="api/v1/dispatcher/login" data-authed="0" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('POSTapi-v1-dispatcher-login', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-POSTapi-v1-dispatcher-login" onclick="tryItOut('POSTapi-v1-dispatcher-login');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-POSTapi-v1-dispatcher-login" onclick="cancelTryOut('POSTapi-v1-dispatcher-login');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-POSTapi-v1-dispatcher-login" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-black">POST</small>
 <b><code>api/v1/dispatcher/login</code></b>
</p>
<h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
<p>
<b><code>email</code></b>&nbsp;&nbsp;<small>string</small>  &nbsp;
<input type="text" name="email" data-endpoint="POSTapi-v1-dispatcher-login" data-component="body" required  hidden>
<br>
The email of the  dispatcher.
</p>
<p>
<b><code>password</code></b>&nbsp;&nbsp;<small>string</small>  &nbsp;
<input type="password" name="password" data-endpoint="POSTapi-v1-dispatcher-login" data-component="body" required  hidden>
<br>
The password of the  dispatcher.
</p>

</form>
<h2>Dispatcher Login Check.</h2>
<p>check wether token is valid or not
Otherwise, returned error message accordingly.</p>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X POST \
    "https://dev.erie.pk/api/v1/dispatcher/verify-auth-token" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer &amp;lt;auth-token&amp;gt;     *"</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "https://dev.erie.pk/api/v1/dispatcher/verify-auth-token"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": "Bearer &amp;lt;auth-token&amp;gt;     *",
};

fetch(url, {
    method: "POST",
    headers,
}).then(response =&gt; response.json());</code></pre>
<blockquote>
<p>Example response (200):</p>
</blockquote>
<pre><code class="language-json">
{
 "success": true,
 "message": "Token is enabled.",
}</code></pre>
<blockquote>
<p>Example response (403):</p>
</blockquote>
<pre><code class="language-json">
{
 "success": false,
 "error": "Token is expired.",
 "data": {
     "error": [
         0: "You are disabled."
      ]
 }
}</code></pre>
<div id="execution-results-POSTapi-v1-dispatcher-verify-auth-token" hidden>
    <blockquote>Received response<span id="execution-response-status-POSTapi-v1-dispatcher-verify-auth-token"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-v1-dispatcher-verify-auth-token"></code></pre>
</div>
<div id="execution-error-POSTapi-v1-dispatcher-verify-auth-token" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-v1-dispatcher-verify-auth-token"></code></pre>
</div>
<form id="form-POSTapi-v1-dispatcher-verify-auth-token" data-method="POST" data-path="api/v1/dispatcher/verify-auth-token" data-authed="0" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json","Authorization":"Bearer \u003Cauth-token\u003E     *"}' onsubmit="event.preventDefault(); executeTryOut('POSTapi-v1-dispatcher-verify-auth-token', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-POSTapi-v1-dispatcher-verify-auth-token" onclick="tryItOut('POSTapi-v1-dispatcher-verify-auth-token');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-POSTapi-v1-dispatcher-verify-auth-token" onclick="cancelTryOut('POSTapi-v1-dispatcher-verify-auth-token');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-POSTapi-v1-dispatcher-verify-auth-token" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-black">POST</small>
 <b><code>api/v1/dispatcher/verify-auth-token</code></b>
</p>
</form>
<h2>Schedule Delivery List</h2>
<p><small class="badge badge-darkred">requires authentication</small></p>
<p>Return list of scheduled deliveries that are assigned
to the dispatcher and they're approved.</p>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X GET \
    -G "https://dev.erie.pk/api/v1/dispatcher/get-delivery-schedules" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer &amp;lt;auth-token&amp;gt;"</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "https://dev.erie.pk/api/v1/dispatcher/get-delivery-schedules"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": "Bearer &amp;lt;auth-token&amp;gt;",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre>
<blockquote>
<p>Example response (200):</p>
</blockquote>
<pre><code class="language-json">
{
 "success": true,
 "data": {
     "id": 1,
     "tripe_no": "Trip-xxx-xx-xxx-xxxxx-xx"
 }
 "message": null
}</code></pre>
<div id="execution-results-GETapi-v1-dispatcher-get-delivery-schedules" hidden>
    <blockquote>Received response<span id="execution-response-status-GETapi-v1-dispatcher-get-delivery-schedules"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-v1-dispatcher-get-delivery-schedules"></code></pre>
</div>
<div id="execution-error-GETapi-v1-dispatcher-get-delivery-schedules" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-v1-dispatcher-get-delivery-schedules"></code></pre>
</div>
<form id="form-GETapi-v1-dispatcher-get-delivery-schedules" data-method="GET" data-path="api/v1/dispatcher/get-delivery-schedules" data-authed="1" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json","Authorization":"Bearer \u003Cauth-token\u003E"}' onsubmit="event.preventDefault(); executeTryOut('GETapi-v1-dispatcher-get-delivery-schedules', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-GETapi-v1-dispatcher-get-delivery-schedules" onclick="tryItOut('GETapi-v1-dispatcher-get-delivery-schedules');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-GETapi-v1-dispatcher-get-delivery-schedules" onclick="cancelTryOut('GETapi-v1-dispatcher-get-delivery-schedules');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-GETapi-v1-dispatcher-get-delivery-schedules" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-green">GET</small>
 <b><code>api/v1/dispatcher/get-delivery-schedules</code></b>
</p>
<p>
<label id="auth-GETapi-v1-dispatcher-get-delivery-schedules" hidden>Authorization header: <b><code>Bearer </code></b><input type="text" name="Authorization" data-prefix="Bearer " data-endpoint="GETapi-v1-dispatcher-get-delivery-schedules" data-component="header"></label>
</p>
</form>
<h2>Schedule Delivery Detail List</h2>
<p><small class="badge badge-darkred">requires authentication</small></p>
<p>Return list of scheduled delivery details which
contains the delivery list of customers.</p>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X GET \
    -G "https://dev.erie.pk/api/v1/dispatcher/get-delivery-schedule/13/details" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer &amp;lt;auth-token&amp;gt;"</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "https://dev.erie.pk/api/v1/dispatcher/get-delivery-schedule/13/details"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": "Bearer &amp;lt;auth-token&amp;gt;",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre>
<blockquote>
<p>Example response (200):</p>
</blockquote>
<pre><code class="language-json">{
    "success": true,
    "message": null
}</code></pre>
<div id="execution-results-GETapi-v1-dispatcher-get-delivery-schedule--scheduleDelivery--details" hidden>
    <blockquote>Received response<span id="execution-response-status-GETapi-v1-dispatcher-get-delivery-schedule--scheduleDelivery--details"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-v1-dispatcher-get-delivery-schedule--scheduleDelivery--details"></code></pre>
</div>
<div id="execution-error-GETapi-v1-dispatcher-get-delivery-schedule--scheduleDelivery--details" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-v1-dispatcher-get-delivery-schedule--scheduleDelivery--details"></code></pre>
</div>
<form id="form-GETapi-v1-dispatcher-get-delivery-schedule--scheduleDelivery--details" data-method="GET" data-path="api/v1/dispatcher/get-delivery-schedule/{scheduleDelivery}/details" data-authed="1" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json","Authorization":"Bearer \u003Cauth-token\u003E"}' onsubmit="event.preventDefault(); executeTryOut('GETapi-v1-dispatcher-get-delivery-schedule--scheduleDelivery--details', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-GETapi-v1-dispatcher-get-delivery-schedule--scheduleDelivery--details" onclick="tryItOut('GETapi-v1-dispatcher-get-delivery-schedule--scheduleDelivery--details');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-GETapi-v1-dispatcher-get-delivery-schedule--scheduleDelivery--details" onclick="cancelTryOut('GETapi-v1-dispatcher-get-delivery-schedule--scheduleDelivery--details');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-GETapi-v1-dispatcher-get-delivery-schedule--scheduleDelivery--details" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-green">GET</small>
 <b><code>api/v1/dispatcher/get-delivery-schedule/{scheduleDelivery}/details</code></b>
</p>
<p>
<label id="auth-GETapi-v1-dispatcher-get-delivery-schedule--scheduleDelivery--details" hidden>Authorization header: <b><code>Bearer </code></b><input type="text" name="Authorization" data-prefix="Bearer " data-endpoint="GETapi-v1-dispatcher-get-delivery-schedule--scheduleDelivery--details" data-component="header"></label>
</p>
<h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
<p>
<b><code>scheduleDelivery</code></b>&nbsp;&nbsp;<small>integer</small>  &nbsp;
<input type="number" name="scheduleDelivery" data-endpoint="GETapi-v1-dispatcher-get-delivery-schedule--scheduleDelivery--details" data-component="url" required  hidden>
<br>
The ID of the scheduleDelivery.
</p>
</form>
<h2>Set Schedule Delivery Dispatch/End</h2>
<p><small class="badge badge-darkred">requires authentication</small></p>
<p>Update schedule delivery according to passed
type i.e. start or end</p>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X POST \
    "https://dev.erie.pk/api/v1/dispatcher/dispatch-delivery-schedules/20" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer &amp;lt;auth-token&amp;gt;" \
    -d '{"image":"assumenda","meter_reading":"12345.6","type":"start\/end"}'
</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "https://dev.erie.pk/api/v1/dispatcher/dispatch-delivery-schedules/20"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": "Bearer &amp;lt;auth-token&amp;gt;",
};

let body = {
    "image": "assumenda",
    "meter_reading": "12345.6",
    "type": "start\/end"
}

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre>
<blockquote>
<p>Example response (200):</p>
</blockquote>
<pre><code class="language-json">{
    "success": true,
    "message": null
}</code></pre>
<div id="execution-results-POSTapi-v1-dispatcher-dispatch-delivery-schedules--scheduleDelivery-" hidden>
    <blockquote>Received response<span id="execution-response-status-POSTapi-v1-dispatcher-dispatch-delivery-schedules--scheduleDelivery-"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-v1-dispatcher-dispatch-delivery-schedules--scheduleDelivery-"></code></pre>
</div>
<div id="execution-error-POSTapi-v1-dispatcher-dispatch-delivery-schedules--scheduleDelivery-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-v1-dispatcher-dispatch-delivery-schedules--scheduleDelivery-"></code></pre>
</div>
<form id="form-POSTapi-v1-dispatcher-dispatch-delivery-schedules--scheduleDelivery-" data-method="POST" data-path="api/v1/dispatcher/dispatch-delivery-schedules/{scheduleDelivery}" data-authed="1" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json","Authorization":"Bearer \u003Cauth-token\u003E"}' onsubmit="event.preventDefault(); executeTryOut('POSTapi-v1-dispatcher-dispatch-delivery-schedules--scheduleDelivery-', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-POSTapi-v1-dispatcher-dispatch-delivery-schedules--scheduleDelivery-" onclick="tryItOut('POSTapi-v1-dispatcher-dispatch-delivery-schedules--scheduleDelivery-');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-POSTapi-v1-dispatcher-dispatch-delivery-schedules--scheduleDelivery-" onclick="cancelTryOut('POSTapi-v1-dispatcher-dispatch-delivery-schedules--scheduleDelivery-');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-POSTapi-v1-dispatcher-dispatch-delivery-schedules--scheduleDelivery-" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-black">POST</small>
 <b><code>api/v1/dispatcher/dispatch-delivery-schedules/{scheduleDelivery}</code></b>
</p>
<p>
<label id="auth-POSTapi-v1-dispatcher-dispatch-delivery-schedules--scheduleDelivery-" hidden>Authorization header: <b><code>Bearer </code></b><input type="text" name="Authorization" data-prefix="Bearer " data-endpoint="POSTapi-v1-dispatcher-dispatch-delivery-schedules--scheduleDelivery-" data-component="header"></label>
</p>
<h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
<p>
<b><code>scheduleDelivery</code></b>&nbsp;&nbsp;<small>integer</small>  &nbsp;
<input type="number" name="scheduleDelivery" data-endpoint="POSTapi-v1-dispatcher-dispatch-delivery-schedules--scheduleDelivery-" data-component="url" required  hidden>
<br>
The ID of the scheduleDelivery.
</p>
<h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
<p>
<b><code>image</code></b>&nbsp;&nbsp;<small>binary</small>  &nbsp;
<input type="text" name="image" data-endpoint="POSTapi-v1-dispatcher-dispatch-delivery-schedules--scheduleDelivery-" data-component="body" required  hidden>
<br>
Picture of meter reading.
</p>
<p>
<b><code>meter_reading</code></b>&nbsp;&nbsp;<small>string</small>  &nbsp;
<input type="text" name="meter_reading" data-endpoint="POSTapi-v1-dispatcher-dispatch-delivery-schedules--scheduleDelivery-" data-component="body" required  hidden>
<br>
Meter reading in numbers.
</p>
<p>
<b><code>type</code></b>&nbsp;&nbsp;<small>string</small>  &nbsp;
<input type="text" name="type" data-endpoint="POSTapi-v1-dispatcher-dispatch-delivery-schedules--scheduleDelivery-" data-component="body" required  hidden>
<br>
type of submit.
</p>

</form>
<h2>Complete Customer Schedule Delivery Order</h2>
<p><small class="badge badge-darkred">requires authentication</small></p>
<p>complete customer delivery order if successfully then providing
order data otherwise send un-deliver status</p>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X POST \
    "https://dev.erie.pk/api/v1/dispatcher/complete-delivery-order/excepturi" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer &amp;lt;auth-token&amp;gt;" \
    -d '{"status":true,"actual_bottle_qty":5,"returned_bottle_qty":5,"cash_received":500,"reason":"Address not found"}'
</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "https://dev.erie.pk/api/v1/dispatcher/complete-delivery-order/excepturi"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": "Bearer &amp;lt;auth-token&amp;gt;",
};

let body = {
    "status": true,
    "actual_bottle_qty": 5,
    "returned_bottle_qty": 5,
    "cash_received": 500,
    "reason": "Address not found"
}

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre>
<blockquote>
<p>Example response (200):</p>
</blockquote>
<pre><code class="language-json">{
    "success": true,
    "message": "Order completed successfully"
}</code></pre>
<div id="execution-results-POSTapi-v1-dispatcher-complete-delivery-order--detail-" hidden>
    <blockquote>Received response<span id="execution-response-status-POSTapi-v1-dispatcher-complete-delivery-order--detail-"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-v1-dispatcher-complete-delivery-order--detail-"></code></pre>
</div>
<div id="execution-error-POSTapi-v1-dispatcher-complete-delivery-order--detail-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-v1-dispatcher-complete-delivery-order--detail-"></code></pre>
</div>
<form id="form-POSTapi-v1-dispatcher-complete-delivery-order--detail-" data-method="POST" data-path="api/v1/dispatcher/complete-delivery-order/{detail}" data-authed="1" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json","Authorization":"Bearer \u003Cauth-token\u003E"}' onsubmit="event.preventDefault(); executeTryOut('POSTapi-v1-dispatcher-complete-delivery-order--detail-', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-POSTapi-v1-dispatcher-complete-delivery-order--detail-" onclick="tryItOut('POSTapi-v1-dispatcher-complete-delivery-order--detail-');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-POSTapi-v1-dispatcher-complete-delivery-order--detail-" onclick="cancelTryOut('POSTapi-v1-dispatcher-complete-delivery-order--detail-');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-POSTapi-v1-dispatcher-complete-delivery-order--detail-" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-black">POST</small>
 <b><code>api/v1/dispatcher/complete-delivery-order/{detail}</code></b>
</p>
<p>
<label id="auth-POSTapi-v1-dispatcher-complete-delivery-order--detail-" hidden>Authorization header: <b><code>Bearer </code></b><input type="text" name="Authorization" data-prefix="Bearer " data-endpoint="POSTapi-v1-dispatcher-complete-delivery-order--detail-" data-component="header"></label>
</p>
<h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
<p>
<b><code>detail</code></b>&nbsp;&nbsp;<small>string</small>  &nbsp;
<input type="text" name="detail" data-endpoint="POSTapi-v1-dispatcher-complete-delivery-order--detail-" data-component="url" required  hidden>
<br>

</p>
<p>
<b><code>scheduleDeliveryDetail</code></b>&nbsp;&nbsp;<small>integer</small>  &nbsp;
<input type="number" name="scheduleDeliveryDetail" data-endpoint="POSTapi-v1-dispatcher-complete-delivery-order--detail-" data-component="url" required  hidden>
<br>
The ID of the scheduleDeliverydetail.
</p>
<h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
<p>
<b><code>status</code></b>&nbsp;&nbsp;<small>boolean</small>  &nbsp;
<label data-endpoint="POSTapi-v1-dispatcher-complete-delivery-order--detail-" hidden><input type="radio" name="status" value="true" data-endpoint="POSTapi-v1-dispatcher-complete-delivery-order--detail-" data-component="body" required ><code>true</code></label>
<label data-endpoint="POSTapi-v1-dispatcher-complete-delivery-order--detail-" hidden><input type="radio" name="status" value="false" data-endpoint="POSTapi-v1-dispatcher-complete-delivery-order--detail-" data-component="body" required ><code>false</code></label>
<br>
Delivery status.
</p>
<p>
<b><code>actual_bottle_qty</code></b>&nbsp;&nbsp;<small>integer</small>  &nbsp;
<input type="number" name="actual_bottle_qty" data-endpoint="POSTapi-v1-dispatcher-complete-delivery-order--detail-" data-component="body" required  hidden>
<br>
Bottle quantity customer taken.
</p>
<p>
<b><code>returned_bottle_qty</code></b>&nbsp;&nbsp;<small>integer</small>  &nbsp;
<input type="number" name="returned_bottle_qty" data-endpoint="POSTapi-v1-dispatcher-complete-delivery-order--detail-" data-component="body" required  hidden>
<br>
Bottle returned by customer.
</p>
<p>
<b><code>cash_received</code></b>&nbsp;&nbsp;<small>integer</small>  &nbsp;
<input type="number" name="cash_received" data-endpoint="POSTapi-v1-dispatcher-complete-delivery-order--detail-" data-component="body" required  hidden>
<br>
Cash given by customer.
</p>
<p>
<b><code>reason</code></b>&nbsp;&nbsp;<small>string</small>  &nbsp;
<input type="text" name="reason" data-endpoint="POSTapi-v1-dispatcher-complete-delivery-order--detail-" data-component="body" required  hidden>
<br>
Reason why order is not delivered.
</p>

</form><h1>Endpoints</h1>
<h2>api/v1/user</h2>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X GET \
    -G "https://dev.erie.pk/api/v1/user" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "https://dev.erie.pk/api/v1/user"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre>
<blockquote>
<p>Example response (401):</p>
</blockquote>
<pre><code class="language-json">{
    "message": "Unauthenticated."
}</code></pre>
<div id="execution-results-GETapi-v1-user" hidden>
    <blockquote>Received response<span id="execution-response-status-GETapi-v1-user"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-v1-user"></code></pre>
</div>
<div id="execution-error-GETapi-v1-user" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-v1-user"></code></pre>
</div>
<form id="form-GETapi-v1-user" data-method="GET" data-path="api/v1/user" data-authed="0" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('GETapi-v1-user', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-GETapi-v1-user" onclick="tryItOut('GETapi-v1-user');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-GETapi-v1-user" onclick="cancelTryOut('GETapi-v1-user');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-GETapi-v1-user" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-green">GET</small>
 <b><code>api/v1/user</code></b>
</p>
</form>
<h2>api/v1/customers/recent-orders</h2>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X GET \
    -G "https://dev.erie.pk/api/v1/customers/recent-orders" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "https://dev.erie.pk/api/v1/customers/recent-orders"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre>
<blockquote>
<p>Example response (401):</p>
</blockquote>
<pre><code class="language-json">{
    "message": "Unauthenticated."
}</code></pre>
<div id="execution-results-GETapi-v1-customers-recent-orders" hidden>
    <blockquote>Received response<span id="execution-response-status-GETapi-v1-customers-recent-orders"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-v1-customers-recent-orders"></code></pre>
</div>
<div id="execution-error-GETapi-v1-customers-recent-orders" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-v1-customers-recent-orders"></code></pre>
</div>
<form id="form-GETapi-v1-customers-recent-orders" data-method="GET" data-path="api/v1/customers/recent-orders" data-authed="0" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('GETapi-v1-customers-recent-orders', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-GETapi-v1-customers-recent-orders" onclick="tryItOut('GETapi-v1-customers-recent-orders');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-GETapi-v1-customers-recent-orders" onclick="cancelTryOut('GETapi-v1-customers-recent-orders');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-GETapi-v1-customers-recent-orders" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-green">GET</small>
 <b><code>api/v1/customers/recent-orders</code></b>
</p>
</form>
<h2>api/v1/invoices/userAssignedInvoices</h2>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X POST \
    "https://dev.erie.pk/api/v1/invoices/userAssignedInvoices" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "https://dev.erie.pk/api/v1/invoices/userAssignedInvoices"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "POST",
    headers,
}).then(response =&gt; response.json());</code></pre>
<div id="execution-results-POSTapi-v1-invoices-userAssignedInvoices" hidden>
    <blockquote>Received response<span id="execution-response-status-POSTapi-v1-invoices-userAssignedInvoices"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-v1-invoices-userAssignedInvoices"></code></pre>
</div>
<div id="execution-error-POSTapi-v1-invoices-userAssignedInvoices" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-v1-invoices-userAssignedInvoices"></code></pre>
</div>
<form id="form-POSTapi-v1-invoices-userAssignedInvoices" data-method="POST" data-path="api/v1/invoices/userAssignedInvoices" data-authed="0" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('POSTapi-v1-invoices-userAssignedInvoices', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-POSTapi-v1-invoices-userAssignedInvoices" onclick="tryItOut('POSTapi-v1-invoices-userAssignedInvoices');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-POSTapi-v1-invoices-userAssignedInvoices" onclick="cancelTryOut('POSTapi-v1-invoices-userAssignedInvoices');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-POSTapi-v1-invoices-userAssignedInvoices" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-black">POST</small>
 <b><code>api/v1/invoices/userAssignedInvoices</code></b>
</p>
</form>
<h2>api/v1/invoices/{invoice}/invoiceDetails</h2>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X POST \
    "https://dev.erie.pk/api/v1/invoices/aliquam/invoiceDetails" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "https://dev.erie.pk/api/v1/invoices/aliquam/invoiceDetails"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "POST",
    headers,
}).then(response =&gt; response.json());</code></pre>
<div id="execution-results-POSTapi-v1-invoices--invoice--invoiceDetails" hidden>
    <blockquote>Received response<span id="execution-response-status-POSTapi-v1-invoices--invoice--invoiceDetails"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-v1-invoices--invoice--invoiceDetails"></code></pre>
</div>
<div id="execution-error-POSTapi-v1-invoices--invoice--invoiceDetails" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-v1-invoices--invoice--invoiceDetails"></code></pre>
</div>
<form id="form-POSTapi-v1-invoices--invoice--invoiceDetails" data-method="POST" data-path="api/v1/invoices/{invoice}/invoiceDetails" data-authed="0" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('POSTapi-v1-invoices--invoice--invoiceDetails', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-POSTapi-v1-invoices--invoice--invoiceDetails" onclick="tryItOut('POSTapi-v1-invoices--invoice--invoiceDetails');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-POSTapi-v1-invoices--invoice--invoiceDetails" onclick="cancelTryOut('POSTapi-v1-invoices--invoice--invoiceDetails');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-POSTapi-v1-invoices--invoice--invoiceDetails" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-black">POST</small>
 <b><code>api/v1/invoices/{invoice}/invoiceDetails</code></b>
</p>
<h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
<p>
<b><code>invoice</code></b>&nbsp;&nbsp;<small>string</small>  &nbsp;
<input type="text" name="invoice" data-endpoint="POSTapi-v1-invoices--invoice--invoiceDetails" data-component="url" required  hidden>
<br>

</p>
</form>
<h2>api/v1/invoices/{invoice}/printDeliveryInvoice</h2>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X POST \
    "https://dev.erie.pk/api/v1/invoices/necessitatibus/printDeliveryInvoice" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "https://dev.erie.pk/api/v1/invoices/necessitatibus/printDeliveryInvoice"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "POST",
    headers,
}).then(response =&gt; response.json());</code></pre>
<div id="execution-results-POSTapi-v1-invoices--invoice--printDeliveryInvoice" hidden>
    <blockquote>Received response<span id="execution-response-status-POSTapi-v1-invoices--invoice--printDeliveryInvoice"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-v1-invoices--invoice--printDeliveryInvoice"></code></pre>
</div>
<div id="execution-error-POSTapi-v1-invoices--invoice--printDeliveryInvoice" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-v1-invoices--invoice--printDeliveryInvoice"></code></pre>
</div>
<form id="form-POSTapi-v1-invoices--invoice--printDeliveryInvoice" data-method="POST" data-path="api/v1/invoices/{invoice}/printDeliveryInvoice" data-authed="0" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('POSTapi-v1-invoices--invoice--printDeliveryInvoice', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-POSTapi-v1-invoices--invoice--printDeliveryInvoice" onclick="tryItOut('POSTapi-v1-invoices--invoice--printDeliveryInvoice');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-POSTapi-v1-invoices--invoice--printDeliveryInvoice" onclick="cancelTryOut('POSTapi-v1-invoices--invoice--printDeliveryInvoice');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-POSTapi-v1-invoices--invoice--printDeliveryInvoice" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-black">POST</small>
 <b><code>api/v1/invoices/{invoice}/printDeliveryInvoice</code></b>
</p>
<h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
<p>
<b><code>invoice</code></b>&nbsp;&nbsp;<small>string</small>  &nbsp;
<input type="text" name="invoice" data-endpoint="POSTapi-v1-invoices--invoice--printDeliveryInvoice" data-component="url" required  hidden>
<br>

</p>
</form>
<h2>api/v1/invoices/{invoice}/update</h2>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X PATCH \
    "https://dev.erie.pk/api/v1/invoices/numquam/update" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "https://dev.erie.pk/api/v1/invoices/numquam/update"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "PATCH",
    headers,
}).then(response =&gt; response.json());</code></pre>
<div id="execution-results-PATCHapi-v1-invoices--invoice--update" hidden>
    <blockquote>Received response<span id="execution-response-status-PATCHapi-v1-invoices--invoice--update"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-PATCHapi-v1-invoices--invoice--update"></code></pre>
</div>
<div id="execution-error-PATCHapi-v1-invoices--invoice--update" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-PATCHapi-v1-invoices--invoice--update"></code></pre>
</div>
<form id="form-PATCHapi-v1-invoices--invoice--update" data-method="PATCH" data-path="api/v1/invoices/{invoice}/update" data-authed="0" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('PATCHapi-v1-invoices--invoice--update', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-PATCHapi-v1-invoices--invoice--update" onclick="tryItOut('PATCHapi-v1-invoices--invoice--update');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-PATCHapi-v1-invoices--invoice--update" onclick="cancelTryOut('PATCHapi-v1-invoices--invoice--update');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-PATCHapi-v1-invoices--invoice--update" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-purple">PATCH</small>
 <b><code>api/v1/invoices/{invoice}/update</code></b>
</p>
<h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
<p>
<b><code>invoice</code></b>&nbsp;&nbsp;<small>string</small>  &nbsp;
<input type="text" name="invoice" data-endpoint="PATCHapi-v1-invoices--invoice--update" data-component="url" required  hidden>
<br>

</p>
</form><h1>User Authentication</h1>
<p>APIs for authentication of users</p>
<h2>this function will handle the otp send</h2>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X POST \
    "https://dev.erie.pk/api/v1/send-otp" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "https://dev.erie.pk/api/v1/send-otp"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "POST",
    headers,
}).then(response =&gt; response.json());</code></pre>
<div id="execution-results-POSTapi-v1-send-otp" hidden>
    <blockquote>Received response<span id="execution-response-status-POSTapi-v1-send-otp"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-v1-send-otp"></code></pre>
</div>
<div id="execution-error-POSTapi-v1-send-otp" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-v1-send-otp"></code></pre>
</div>
<form id="form-POSTapi-v1-send-otp" data-method="POST" data-path="api/v1/send-otp" data-authed="0" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('POSTapi-v1-send-otp', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-POSTapi-v1-send-otp" onclick="tryItOut('POSTapi-v1-send-otp');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-POSTapi-v1-send-otp" onclick="cancelTryOut('POSTapi-v1-send-otp');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-POSTapi-v1-send-otp" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-black">POST</small>
 <b><code>api/v1/send-otp</code></b>
</p>
</form>
<h2>api/v1/verify-otp-auth</h2>
<blockquote>
<p>Example request:</p>
</blockquote>
<pre><code class="language-bash">curl -X POST \
    "https://dev.erie.pk/api/v1/verify-otp-auth" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"</code></pre>
<pre><code class="language-javascript">const url = new URL(
    "https://dev.erie.pk/api/v1/verify-otp-auth"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "POST",
    headers,
}).then(response =&gt; response.json());</code></pre>
<div id="execution-results-POSTapi-v1-verify-otp-auth" hidden>
    <blockquote>Received response<span id="execution-response-status-POSTapi-v1-verify-otp-auth"></span>:</blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-v1-verify-otp-auth"></code></pre>
</div>
<div id="execution-error-POSTapi-v1-verify-otp-auth" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-v1-verify-otp-auth"></code></pre>
</div>
<form id="form-POSTapi-v1-verify-otp-auth" data-method="POST" data-path="api/v1/verify-otp-auth" data-authed="0" data-hasfiles="0" data-headers='{"Content-Type":"application\/json","Accept":"application\/json"}' onsubmit="event.preventDefault(); executeTryOut('POSTapi-v1-verify-otp-auth', this);">
<h3>
    Request&nbsp;&nbsp;&nbsp;
        <button type="button" style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-tryout-POSTapi-v1-verify-otp-auth" onclick="tryItOut('POSTapi-v1-verify-otp-auth');">Try it out ⚡</button>
    <button type="button" style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-canceltryout-POSTapi-v1-verify-otp-auth" onclick="cancelTryOut('POSTapi-v1-verify-otp-auth');" hidden>Cancel</button>&nbsp;&nbsp;
    <button type="submit" style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;" id="btn-executetryout-POSTapi-v1-verify-otp-auth" hidden>Send Request 💥</button>
    </h3>
<p>
<small class="badge badge-black">POST</small>
 <b><code>api/v1/verify-otp-auth</code></b>
</p>
</form>
    </div>
    <div class="dark-box">
                    <div class="lang-selector">
                                    <a href="#" data-language-name="bash">bash</a>
                                    <a href="#" data-language-name="javascript">javascript</a>
                            </div>
            </div>
</div>
<script>
    $(function () {
        var languages = ["bash","javascript"];
        setupLanguages(languages);
    });
</script>
</body>
</html>