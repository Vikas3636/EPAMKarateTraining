const MIN_VER = {'major': 1, 'minor': 0};

var port = null;
var native_host_protocol_version = {'major': null, 'minor': null};
var is_native_host_protocol_supported = false;
var is_connection_established = false;

function set_native_host_protocol_version(str) {
  var version_arr = str.split('.');
  native_host_protocol_version.major = Number(version_arr[0]);
  native_host_protocol_version.minor = Number(version_arr[1]);

  if (native_host_protocol_version.major < MIN_VER.major ||
      ((native_host_protocol_version.major == MIN_VER.major) &&
       (native_host_protocol_version.minor < MIN_VER.minor))) {
    is_native_host_protocol_supported = false;
  } else {
    is_native_host_protocol_supported = true;
  }
}

function send_hello() {
  if (port != null) {
    port.postMessage({message: "HELLO"});
  }
}

function handle_native_response(response) {
  if ('error' in response) {
    console.log("Native host error: " + response.error);
  }

  if ('version' in response) {
    is_connection_established = true;
    set_native_host_protocol_version(response.version);
    console.log("Native host version: " + response.version);
  }
}

function handle_disconnect() {
  if ((chrome.runtime.lastError != undefined) && ('message' in chrome.runtime.lastError)) {
    console.log("Connection error: " + chrome.runtime.lastError.message);
  } else {
    console.log("Disconnected");
  }

  port = null;
  if (is_connection_established) {
    is_connection_established = false;
    // Disconnect may occur on upgrade try to reconnect immediately
    create_port()
  } else {
    // If we disconneted before the connect ever succeeded,
    // there's a problem with the native host
    // Try again in 1 minute
    setTimeout(create_port, 60 * 1000);
  }
}

function handle_url_request(details) {
  if (port != null && is_native_host_protocol_supported) {
    // When (and if) the protocol changes native_host_protocol_version should be
    // checked here to detemine the relevant JSON format to send to the native host
    port.postMessage({url: details.url});
  }
}

function create_port() {
  port = chrome.runtime.connectNative('com.sentinelone.browser.extension.host');
  port.onMessage.addListener(handle_native_response);
  port.onDisconnect.addListener(handle_disconnect);
  send_hello();
}

create_port();

chrome.webRequest.onBeforeRequest.addListener(handle_url_request,
  {urls: ["*://*/*"], types: ["main_frame", "sub_frame"]});
