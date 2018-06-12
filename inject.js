/**
* React Chrome Extension Modifier
* @author Loreto Parisi (loretoparisi at gmail dot com)
* @2018 Loreto Parisi.
*/

/**
 * TextOverlay Range Matcher
 */
class RangeMatcher {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.lastIndex = 0;
  }
  exec(text) {
    if (this.lastIndex !== 0) {
      this.lastIndex = 0;
      return null;
    }
    this.lastIndex = this.end;
    return [text.slice(this.start, this.end)];
  }
}
// ranges must be non-overlapping and ordered.
function matchRanges(ranges) {
  let offset = 0;
  const strategies = [];
  for (const [start, end, css] of ranges) {
    strategies.push({ match: new RangeMatcher(start - offset, end - offset), css });
    offset = end;
  }
  return strategies;
}

function prepareQueryString(obj) {
  var pairs = [];
  for (var prop in obj) {
    if (!obj.hasOwnProperty(prop) || typeof (obj[prop]) == 'undefined') {
      continue;
    }
    pairs.push(prop + '=' + encodeURIComponent(obj[prop]));
  }
  return pairs.join('&');
} //prepareQueryString

/**
 * Script Injector
 * not used here because we load the js in the extension via Manifest
 */
function Injector() {
  this.injectReact = function (callback) {
    let injc = (src, cbk) => { let script = document.createElement('script'); script.src = src; document.getElementsByTagName('head')[0].appendChild(script); script.onload = () => cbk() }
    injc("https://unpkg.com/react@16/umd/react.development.js", () => injc("https://unpkg.com/react-dom@16/umd/react-dom.development.js", () => { callback.apply(this); }))
  }
}
/**
 * Create UI
 */
function UI() {

  this.contents = function () {
    // container
    this.container = document.getElementsByClassName('tagline')[0].nextSibling;

    console.log(this.container);

    if (typeof this.container == 'undefined') return null;
    return this.container;

  }//contents
  /**
   * It renders api data to contents
   */
  this.render = function () {

    // ranges must be non-overlapping and ordered.
    var ranges = [
      [0, 12, { 'background-color': '#fbb' }],
      [13, 23, { 'background-color': '#bfb' }],
      [24, 27, { 'background-color': '#bbf' }]
    ];
    console.log(JSON.stringify(ranges));
    var matchedRanges= matchRanges(ranges);
    new Textoverlay(this.contents(), matchedRanges);

  }//render

}//UI

function API() {

  this.baseurl = 'somedomain';

  /**
   * Performs an XMLHttpRequest to Twitter's API to get trending topics.
   *
   * @param callback Function If the response from fetching url has a
   *     HTTP status of 200, this function is called with a JSON decoded
   *     response.  Otherwise, this function is called with null.
   */
  this.post = function (method, params, body) {
    var url = this.baseurl + method;
    if (params) url += '?' + prepareQueryString(params);
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function (data) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            return resolve(response);
          } else {
            var error = new Error(xhr.statusText);
            return reject(error);
          }
        }
      }
      xhr.open('POST', url);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify(body));
    });
  }//post
}//API

function APP() {
  this.start = function () {
    return new Promise((resolve, reject) => {
      if (!(new UI).contents()) reject(new Error('element not found'))
      else resolve(true);
    });
  }//start
}//APP

$(document).ready(function () {
  console.log("distorting space time continuum...");
  // warm up
  (new APP).start()
    .then(ok => (new UI).render())
    .catch(error => console.error(error))

});
