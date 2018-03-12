setTimeout(function(){
  var now = Date.now();
  for(var p in util.map){
    if(util.map[p].end < now){
      delete util.map[p];
    }
  }
}, 9e5);
var util = {
  timeout: 72e5,//two hour
  map: {},
  add(key, value, timeout){
    var now = Date.now();
    this.map[key] = {
      start: now,
      end: now + (timeout || this.timeout),
      value: value
    }
  },
  update(key, property, value){
    this.map[key][property] = value;
  },
  get(key){
    var now = Date.now(),
        one = this.map[key];
    if(one && now > one.end){
      delete this.map[key];
      return null;
    }
    if(!one || !one.value){
      return null;
    }
    return one.value;
  },
  deleteByKey(key){
    delete this.map[key];
  },
  updateByRequest(request, property, value){
    var state = request.state;
    var session = state.session;
    if(property == 'end'){
      value = Date.now() + this.timeout;
    }
    session && this.map[session.sessionId] && (this.map[session.sessionId][property] = value);
  },
  getByRequest(request){
    var state = request.state;
    var session = state.session;
    return (session ? this.get(session.sessionId) : null);
  },
  deleteByRequest(request){
    var state = request.state;
    var session = state.session;
    session && this.deleteByKey(session.sessionId);
  },
  init(server){
    server.state('session', {
      ttl: this.timeout,
      isSecure: false,
      path: '/',
      encoding: 'base64json'
    });
  }
};
module.exports = util;
