# Endpoints


## api/v1/user




> Example request:

```bash
curl -X GET \
    -G "https://dev.erie.pk/api/v1/user" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "https://dev.erie.pk/api/v1/user"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "GET",
    headers,
}).then(response => response.json());
```


> Example response (401):

```json
{
    "message": "Unauthenticated."
}
```
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


## api/v1/customers/recent-orders




> Example request:

```bash
curl -X GET \
    -G "https://dev.erie.pk/api/v1/customers/recent-orders" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "https://dev.erie.pk/api/v1/customers/recent-orders"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "GET",
    headers,
}).then(response => response.json());
```


> Example response (401):

```json
{
    "message": "Unauthenticated."
}
```
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


## api/v1/invoices/userAssignedInvoices




> Example request:

```bash
curl -X POST \
    "https://dev.erie.pk/api/v1/invoices/userAssignedInvoices" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "https://dev.erie.pk/api/v1/invoices/userAssignedInvoices"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "POST",
    headers,
}).then(response => response.json());
```


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


## api/v1/invoices/{invoice}/invoiceDetails




> Example request:

```bash
curl -X POST \
    "https://dev.erie.pk/api/v1/invoices/aliquam/invoiceDetails" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "https://dev.erie.pk/api/v1/invoices/aliquam/invoiceDetails"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "POST",
    headers,
}).then(response => response.json());
```


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


## api/v1/invoices/{invoice}/printDeliveryInvoice




> Example request:

```bash
curl -X POST \
    "https://dev.erie.pk/api/v1/invoices/necessitatibus/printDeliveryInvoice" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "https://dev.erie.pk/api/v1/invoices/necessitatibus/printDeliveryInvoice"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "POST",
    headers,
}).then(response => response.json());
```


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


## api/v1/invoices/{invoice}/update




> Example request:

```bash
curl -X PATCH \
    "https://dev.erie.pk/api/v1/invoices/numquam/update" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "https://dev.erie.pk/api/v1/invoices/numquam/update"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "PATCH",
    headers,
}).then(response => response.json());
```


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
</form>



