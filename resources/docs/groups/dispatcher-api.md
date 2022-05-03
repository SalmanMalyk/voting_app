# Dispatcher API

API endpoints for managing dispatcher app

## Dispatcher Login API.


check if dispatcher info is correct. If valid credentials are endtered, returned auth token.

Otherwise, returned error message accordingly.

> Example request:

```bash
curl -X POST \
    "https://dev.erie.pk/api/v1/dispatcher/login" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"email":"testuser@example.com","password":"secret"}'

```

```javascript
const url = new URL(
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
}).then(response => response.json());
```


> Example response (200):

```json

{
 "access_token": "eyJ0eXA...",
 "user": "{
     "id": 1,
     "name": "John Doe"
 }",
}
```
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


## Dispatcher Login Check.


check wether token is valid or not
Otherwise, returned error message accordingly.

> Example request:

```bash
curl -X POST \
    "https://dev.erie.pk/api/v1/dispatcher/verify-auth-token" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer &lt;auth-token&gt;     *"
```

```javascript
const url = new URL(
    "https://dev.erie.pk/api/v1/dispatcher/verify-auth-token"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": "Bearer &lt;auth-token&gt;     *",
};


fetch(url, {
    method: "POST",
    headers,
}).then(response => response.json());
```


> Example response (200):

```json

{
 "success": true,
 "message": "Token is enabled.",
}
```
> Example response (403):

```json

{
 "success": false,
 "error": "Token is expired.",
 "data": {
     "error": [
         0: "You are disabled."
      ]
 }
}
```
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


## Schedule Delivery List

<small class="badge badge-darkred">requires authentication</small>

Return list of scheduled deliveries that are assigned
to the dispatcher and they're approved.

> Example request:

```bash
curl -X GET \
    -G "https://dev.erie.pk/api/v1/dispatcher/get-delivery-schedules" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer &lt;auth-token&gt;"
```

```javascript
const url = new URL(
    "https://dev.erie.pk/api/v1/dispatcher/get-delivery-schedules"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": "Bearer &lt;auth-token&gt;",
};


fetch(url, {
    method: "GET",
    headers,
}).then(response => response.json());
```


> Example response (200):

```json

{
 "success": true,
 "data": {
     "id": 1,
     "tripe_no": "Trip-xxx-xx-xxx-xxxxx-xx"
 }
 "message": null
}
```
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


## Schedule Delivery Detail List

<small class="badge badge-darkred">requires authentication</small>

Return list of scheduled delivery details which
contains the delivery list of customers.

> Example request:

```bash
curl -X GET \
    -G "https://dev.erie.pk/api/v1/dispatcher/get-delivery-schedule/13/details" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer &lt;auth-token&gt;"
```

```javascript
const url = new URL(
    "https://dev.erie.pk/api/v1/dispatcher/get-delivery-schedule/13/details"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": "Bearer &lt;auth-token&gt;",
};


fetch(url, {
    method: "GET",
    headers,
}).then(response => response.json());
```


> Example response (200):

```json
{
    "success": true,
    "message": null
}
```
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


## Set Schedule Delivery Dispatch/End

<small class="badge badge-darkred">requires authentication</small>

Update schedule delivery according to passed
type i.e. start or end

> Example request:

```bash
curl -X POST \
    "https://dev.erie.pk/api/v1/dispatcher/dispatch-delivery-schedules/20" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer &lt;auth-token&gt;" \
    -d '{"image":"assumenda","meter_reading":"12345.6","type":"start\/end"}'

```

```javascript
const url = new URL(
    "https://dev.erie.pk/api/v1/dispatcher/dispatch-delivery-schedules/20"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": "Bearer &lt;auth-token&gt;",
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
}).then(response => response.json());
```


> Example response (200):

```json
{
    "success": true,
    "message": null
}
```
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


## Complete Customer Schedule Delivery Order

<small class="badge badge-darkred">requires authentication</small>

complete customer delivery order if successfully then providing
order data otherwise send un-deliver status

> Example request:

```bash
curl -X POST \
    "https://dev.erie.pk/api/v1/dispatcher/complete-delivery-order/excepturi" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer &lt;auth-token&gt;" \
    -d '{"status":true,"actual_bottle_qty":5,"returned_bottle_qty":5,"cash_received":500,"reason":"Address not found"}'

```

```javascript
const url = new URL(
    "https://dev.erie.pk/api/v1/dispatcher/complete-delivery-order/excepturi"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": "Bearer &lt;auth-token&gt;",
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
}).then(response => response.json());
```


> Example response (200):

```json
{
    "success": true,
    "message": "Order completed successfully"
}
```
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

</form>



