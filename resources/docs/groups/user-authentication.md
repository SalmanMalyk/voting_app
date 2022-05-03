# User Authentication

APIs for authentication of users

## this function will handle the otp send




> Example request:

```bash
curl -X POST \
    "https://dev.erie.pk/api/v1/send-otp" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "https://dev.erie.pk/api/v1/send-otp"
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


## api/v1/verify-otp-auth




> Example request:

```bash
curl -X POST \
    "https://dev.erie.pk/api/v1/verify-otp-auth" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "https://dev.erie.pk/api/v1/verify-otp-auth"
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



