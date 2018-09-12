module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1536577187685, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _agents = require('./agents');

Object.defineProperty(exports, 'agents', {
  enumerable: true,
  get: function get() {
    return _agents.agents;
  }
});

var _feature = require('./feature');

Object.defineProperty(exports, 'feature', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_feature).default;
  }
});

var _features = require('./features');

Object.defineProperty(exports, 'features', {
  enumerable: true,
  get: function get() {
    return _features.features;
  }
});

var _region = require('./region');

Object.defineProperty(exports, 'region', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_region).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
}, function(modId) {var map = {"./agents":1536577187686,"./feature":1536577187692,"./features":1536577187695,"./region":1536577187696}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187686, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.agents = undefined;

var _browsers = require('./browsers');

var _browserVersions = require('./browserVersions');

var agentsData = require('../../data/agents');

function unpackBrowserVersions(versionsData) {
    return Object.keys(versionsData).reduce(function (usage, version) {
        usage[_browserVersions.browserVersions[version]] = versionsData[version];
        return usage;
    }, {});
}

var agents = exports.agents = Object.keys(agentsData).reduce(function (map, key) {
    var versionsData = agentsData[key];
    map[_browsers.browsers[key]] = Object.keys(versionsData).reduce(function (data, entry) {
        if (entry === 'A') {
            data.usage_global = unpackBrowserVersions(versionsData[entry]);
        } else if (entry === 'C') {
            data.versions = versionsData[entry].reduce(function (list, version) {
                if (version === '') {
                    list.push(null);
                } else {
                    list.push(_browserVersions.browserVersions[version]);
                }
                return list;
            }, []);
        } else if (entry === 'D') {
            data.prefix_exceptions = unpackBrowserVersions(versionsData[entry]);
        } else if (entry === 'E') {
            data.browser = versionsData[entry];
        } else if (entry === 'F') {
            data.release_date = Object.keys(versionsData[entry]).reduce(function (map, key) {
                map[_browserVersions.browserVersions[key]] = versionsData[entry][key];
                return map;
            }, {});
        } else {
            // entry is B
            data.prefix = versionsData[entry];
        }
        return data;
    }, {});
    return map;
}, {});
}, function(modId) { var map = {"./browsers":1536577187687,"./browserVersions":1536577187689,"../../data/agents":1536577187691}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187687, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var browsers = exports.browsers = require('../../data/browsers');
}, function(modId) { var map = {"../../data/browsers":1536577187688}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187688, function(require, module, exports) {
module.exports={A:"ie",B:"edge",C:"firefox",D:"chrome",E:"safari",F:"opera",G:"ios_saf",H:"op_mini",I:"android",J:"bb",K:"op_mob",L:"and_chr",M:"and_ff",N:"ie_mob",O:"and_uc",P:"samsung",Q:"and_qq",R:"baidu"};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187689, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var browserVersions = exports.browserVersions = require('../../data/browserVersions');
}, function(modId) { var map = {"../../data/browserVersions":1536577187690}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187690, function(require, module, exports) {
module.exports={"0":"60","1":"11.1","2":"32","3":"56","4":"3","5":"58","6":"59","7":"4.2-4.3","8":"61","9":"62",A:"10",B:"11",C:"12",D:"7",E:"9",F:"4",G:"8",H:"6",I:"18",J:"15",K:"5",L:"16",M:"46",N:"17",O:"19",P:"20",Q:"21",R:"22",S:"23",T:"24",U:"25",V:"26",W:"27",X:"28",Y:"29",Z:"30",a:"31",b:"67",c:"33",d:"34",e:"35",f:"36",g:"37",h:"38",i:"39",j:"40",k:"41",l:"42",m:"43",n:"44",o:"45",p:"13",q:"47",r:"48",s:"49",t:"50",u:"51",v:"52",w:"53",x:"54",y:"55",z:"14",AB:"63",BB:"11.5",CB:"57",DB:"3.2",EB:"12.1",FB:"5.5",GB:"66",HB:"68",IB:"69",JB:"70",KB:"71",LB:"3.1",MB:"64",NB:"5.1",OB:"6.1",PB:"7.1",QB:"9.1",RB:"10.1",SB:"3.6",TB:"TP",UB:"9.5-9.6",VB:"10.0-10.1",WB:"10.5",XB:"10.6",YB:"3.5",ZB:"11.6",aB:"2",bB:"4.0-4.1",cB:"65",dB:"5.0-5.1",eB:"6.0-6.1",fB:"7.0-7.1",gB:"8.1-8.4",hB:"9.0-9.2",iB:"9.3",jB:"10.0-10.2",kB:"10.3",lB:"11.0-11.2",mB:"11.3-11.4",nB:"all",oB:"2.1",pB:"2.2",qB:"2.3",rB:"4.1",sB:"4.4",tB:"4.4.3-4.4.4",uB:"11.8",vB:"6.2",wB:"7.2",xB:"1.2",yB:"7.12"};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187691, function(require, module, exports) {
module.exports={A:{A:{H:0.00884489,D:0.00884489,G:0.176898,E:0.145941,A:0.0928713,B:2.64462,FB:0.009298},B:"ms",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","FB","H","D","G","E","A","B","","",""],E:"IE",F:{FB:962323200,H:998870400,D:1161129600,G:1237420800,E:1300060800,A:1346716800,B:1381968000}},B:{A:{C:0.025902,p:0.025902,z:0.060438,J:0.069072,L:0.263337,N:1.38144,I:0},B:"ms",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","C","p","z","J","L","N","I","",""],E:"Edge",F:{C:1438128000,p:1447286400,z:1470096000,J:1491868800,L:1508198400,N:1525046400,I:null}},C:{A:{"0":0.453285,"2":0.004471,"3":0.090657,"4":0.004317,"5":0.038853,"6":0.082023,"8":2.91398,"9":0.094974,aB:0.004317,F:0.008634,K:0.004879,H:0.020136,D:0.005725,G:0.004317,E:0.00533,A:0.004283,B:0.004317,C:0.004471,p:0.004486,z:0.00453,J:0.004317,L:0.004417,N:0.004349,I:0.004393,O:0.004443,P:0.004283,Q:0.008634,R:0.004393,S:0.004317,T:0.008786,U:0.004317,V:0.004317,W:0.004393,X:0.004418,Y:0.004317,Z:0.008634,a:0.017268,c:0.008634,d:0.012951,e:0.008634,f:0.004317,g:0.008634,h:0.056121,i:0.008634,j:0.008634,k:0.008634,l:0.004317,m:0.025902,n:0.012951,o:0.030219,M:0.008634,q:0.069072,r:0.099291,s:0.017268,t:0.021585,u:0.056121,v:0.410115,w:0.017268,x:0.021585,y:0.038853,CB:0.047487,AB:0,YB:0.008786,SB:0.008634},B:"moz",C:["","","","aB","4","YB","SB","F","K","H","D","G","E","A","B","C","p","z","J","L","N","I","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","2","c","d","e","f","g","h","i","j","k","l","m","n","o","M","q","r","s","t","u","v","w","x","y","3","CB","5","6","0","8","9","AB",""],E:"Firefox",F:{"0":1525824000,"2":1409616000,"3":1506556800,"4":1213660800,"5":1516665600,"6":1520985600,"8":1529971200,"9":null,aB:1161648000,YB:1246320000,SB:1264032000,F:1300752000,K:1308614400,H:1313452800,D:1317081600,G:1317081600,E:1320710400,A:1324339200,B:1327968000,C:1331596800,p:1335225600,z:1338854400,J:1342483200,L:1346112000,N:1349740800,I:1353628800,O:1357603200,P:1361232000,Q:1364860800,R:1368489600,S:1372118400,T:1375747200,U:1379376000,V:1386633600,W:1391472000,X:1395100800,Y:1398729600,Z:1402358400,a:1405987200,c:1413244800,d:1417392000,e:1421107200,f:1424736000,g:1428278400,h:1431475200,i:1435881600,j:1439251200,k:1442880000,l:1446508800,m:1450137600,n:1453852800,o:1457395200,M:1461628800,q:1465257600,r:1470096000,s:1474329600,t:1479168000,u:1485216000,v:1488844800,w:1492560000,x:1497312000,y:1502150400,CB:1510617600,AB:null}},D:{A:{"0":0.08634,"2":0.012951,"3":0.094974,"5":0.107925,"6":0.047487,"8":0.082023,"9":0.120876,F:0.004706,K:0.004879,H:0.004879,D:0.005591,G:0.005591,E:0.005591,A:0.004534,B:0.008634,C:0.004283,p:0.004879,z:0.004706,J:0.017268,L:0.004393,N:0.004393,I:0.012951,O:0.004418,P:0.004393,Q:0.004317,R:0.021585,S:0.008786,T:0.012951,U:0.008634,V:0.008634,W:0.004317,X:0.004317,Y:0.289239,Z:0.012951,a:0.030219,c:0.012951,d:0.021585,e:0.012951,f:0.021585,g:0.017268,h:0.030219,i:0.017268,j:0.017268,k:0.090657,l:0.012951,m:0.051804,n:0.012951,o:0.017268,M:0.017268,q:0.030219,r:0.038853,s:0.69072,t:0.021585,u:0.038853,v:0.021585,w:0.021585,x:0.064755,y:0.271971,CB:0.064755,AB:0.500772,MB:0.17268,cB:0.289239,GB:0.530991,b:23.4715,HB:0.591429,IB:0.04317,JB:0.004317,KB:0},B:"webkit",C:["F","K","H","D","G","E","A","B","C","p","z","J","L","N","I","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","2","c","d","e","f","g","h","i","j","k","l","m","n","o","M","q","r","s","t","u","v","w","x","y","3","CB","5","6","0","8","9","AB","MB","cB","GB","b","HB","IB","JB","KB"],E:"Chrome",F:{"0":1500940800,"2":1389657600,"3":1485302400,"5":1492560000,"6":1496707200,"8":1504569600,"9":1508198400,F:1264377600,K:1274745600,H:1283385600,D:1287619200,G:1291248000,E:1296777600,A:1299542400,B:1303862400,C:1307404800,p:1312243200,z:1316131200,J:1316131200,L:1319500800,N:1323734400,I:1328659200,O:1332892800,P:1337040000,Q:1340668800,R:1343692800,S:1348531200,T:1352246400,U:1357862400,V:1361404800,W:1364428800,X:1369094400,Y:1374105600,Z:1376956800,a:1384214400,c:1392940800,d:1397001600,e:1400544000,f:1405468800,g:1409011200,h:1412640000,i:1416268800,j:1421798400,k:1425513600,l:1429401600,m:1432080000,n:1437523200,o:1441152000,M:1444780800,q:1449014400,r:1453248000,s:1456963200,t:1460592000,u:1464134400,v:1469059200,w:1472601600,x:1476230400,y:1480550400,CB:1489017600,AB:1512518400,MB:1516752000,cB:1520294400,GB:1523923200,b:1527552000,HB:1532390400,IB:null,JB:null,KB:null}},E:{A:{"1":1.37281,F:0,K:0.008634,H:0.004349,D:0.004317,G:0.038853,E:0.034536,A:0.064755,B:0.220167,C:0.012951,LB:0,DB:0.008692,NB:0.025902,OB:0.012951,PB:0.004283,QB:0.116559,RB:0.21585,TB:0},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","LB","DB","F","K","NB","H","OB","D","PB","G","E","QB","A","RB","B","1","C","TB",""],E:"Safari",F:{"1":1522281600,LB:1205798400,DB:1226534400,F:1244419200,K:1275868800,NB:1311120000,H:1343174400,OB:1382400000,D:1382400000,PB:1410998400,G:1413417600,E:1443657600,QB:1458518400,A:1474329600,RB:1490572800,B:1505779200,C:null,TB:null}},F:{A:{"1":0.006229,"2":0.005152,E:0.0082,B:0.016581,C:0.004317,J:0.00685,L:0.00685,N:0.00685,I:0.005014,O:0.006015,P:0.004879,Q:0.006597,R:0.006597,S:0.013434,T:0.006702,U:0.006015,V:0.005595,W:0.004393,X:0.008634,Y:0.004879,Z:0.004879,a:0.008634,c:0.005014,d:0.009758,e:0.004879,f:0.025902,g:0.004283,h:0.004367,i:0.004534,j:0.004367,k:0.004227,l:0.004418,m:0.004317,n:0.004227,o:0.004471,M:0.004417,q:0.008942,r:0.004369,s:0.004317,t:0.004369,u:0.004317,v:0.008634,w:0.246069,x:0,y:0,UB:0.00685,VB:0,WB:0.008392,XB:0.004706,BB:0.004879,ZB:0.008786,EB:0.038853},B:"webkit",C:["","","","","","","","","","","","","","E","UB","VB","WB","XB","B","1","BB","ZB","C","EB","J","L","N","I","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","2","c","d","e","f","g","h","i","j","k","l","m","n","o","M","q","r","s","t","u","v","w","x","y","","",""],E:"Opera",F:{"1":1302566400,"2":1442448000,E:1150761600,UB:1223424000,VB:1251763200,WB:1267488000,XB:1277942400,B:1292457600,BB:1309219200,ZB:1323129600,C:1323129600,EB:1352073600,J:1372723200,L:1377561600,N:1381104000,I:1386288000,O:1390867200,P:1393891200,Q:1399334400,R:1401753600,S:1405987200,T:1409616000,U:1413331200,V:1417132800,W:1422316800,X:1425945600,Y:1430179200,Z:1433808000,a:1438646400,c:1445904000,d:1449100800,e:1454371200,f:1457308800,g:1462320000,h:1465344000,i:1470096000,j:1474329600,k:1477267200,l:1481587200,m:1486425600,n:1490054400,o:1494374400,M:1498003200,q:1502236800,r:1506470400,s:1510099200,t:1515024000,u:1517961600,v:1521676800,w:1525910400,x:1530144000,y:1534982400},D:{"1":"o",E:"o",B:"o",C:"o",UB:"o",VB:"o",WB:"o",XB:"o",BB:"o",ZB:"o",EB:"o"}},G:{A:{"7":0.00301888,G:0.00805035,C:0.0674217,DB:0.00100629,bB:0,dB:0.0181133,eB:0.00805035,fB:0.0533336,gB:0.0764783,hB:0.0402517,iB:0.302894,jB:0.326039,kB:0.605789,lB:1.29812,mB:7.25034},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","DB","bB","7","dB","eB","fB","G","gB","hB","iB","jB","kB","lB","mB","C","",""],E:"iOS Safari",F:{"7":1299628800,DB:1270252800,bB:1283904000,dB:1331078400,eB:1359331200,fB:1394409600,G:1410912000,gB:1413763200,hB:1442361600,iB:1458518400,jB:1473724800,kB:1490572800,lB:1505779200,mB:1522281600,C:null}},H:{A:{nB:2.29201},B:"o",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","nB","","",""],E:"Opera Mini",F:{nB:1426464000}},I:{A:{"4":0,"7":0.15472,F:0,b:0,oB:0,pB:0,qB:0,rB:0,sB:0.576334,tB:0.377131},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","oB","pB","qB","4","F","rB","7","sB","tB","b","","",""],E:"Android Browser",F:{"4":1298332800,"7":1374624000,oB:1256515200,pB:1274313600,qB:1291593600,F:1318896000,rB:1341792000,sB:1386547200,tB:1401667200,b:1494115200}},J:{A:{D:0.0079562,A:0.0318248},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","D","A","","",""],E:"Blackberry Browser",F:{D:1325376000,A:1359504000}},K:{A:{"1":0,A:0,B:0,C:0,M:0.0111391,BB:0,EB:0},B:"o",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","A","B","1","BB","C","EB","M","","",""],E:"Opera Mobile",F:{"1":1314835200,A:1287100800,B:1300752000,BB:1318291200,C:1330300800,EB:1349740800,M:1474588800},D:{M:"webkit"}},L:{A:{b:32.6509},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","b","","",""],E:"Chrome for Android",F:{b:1527724800}},M:{A:{"0":0.176173},B:"moz",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","0","","",""],E:"Firefox for Android",F:{"0":1525824000}},N:{A:{A:0.0234897,B:0.152683},B:"ms",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","A","B","","",""],E:"IE Mobile",F:{A:1340150400,B:1353456000}},O:{A:{uB:7.09807},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","uB","","",""],E:"UC Browser for Android",F:{uB:1471392000},D:{uB:"webkit"}},P:{A:{F:0.828383,K:0.155322,vB:0.320998,wB:0},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","F","K","vB","wB","","",""],E:"Samsung Internet",F:{F:1461024000,K:1481846400,vB:1509408000,wB:1528329600}},Q:{A:{xB:0},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","xB","","",""],E:"QQ Browser",F:{xB:1483228800}},R:{A:{yB:0},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","yB","","",""],E:"Baidu Browser",F:{yB:1491004800}}};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187692, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = unpackFeature;

var _statuses = require('../lib/statuses');

var _statuses2 = _interopRequireDefault(_statuses);

var _supported = require('../lib/supported');

var _supported2 = _interopRequireDefault(_supported);

var _browsers = require('./browsers');

var _browserVersions = require('./browserVersions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MATH2LOG = Math.log(2);

function unpackSupport(cipher) {
    // bit flags
    var stats = Object.keys(_supported2.default).reduce(function (list, support) {
        if (cipher & _supported2.default[support]) list.push(support);
        return list;
    }, []);

    // notes
    var notes = cipher >> 7;
    var notesArray = [];
    while (notes) {
        var note = Math.floor(Math.log(notes) / MATH2LOG) + 1;
        notesArray.unshift('#' + note);
        notes -= Math.pow(2, note - 1);
    }

    return stats.concat(notesArray).join(' ');
}

function unpackFeature(packed) {
    var unpacked = { status: _statuses2.default[packed.B], title: packed.C };
    unpacked.stats = Object.keys(packed.A).reduce(function (browserStats, key) {
        var browser = packed.A[key];
        browserStats[_browsers.browsers[key]] = Object.keys(browser).reduce(function (stats, support) {
            var packedVersions = browser[support].split(' ');
            var unpacked = unpackSupport(support);
            packedVersions.forEach(function (v) {
                return stats[_browserVersions.browserVersions[v]] = unpacked;
            });
            return stats;
        }, {});
        return browserStats;
    }, {});
    return unpacked;
}
}, function(modId) { var map = {"../lib/statuses":1536577187693,"../lib/supported":1536577187694,"./browsers":1536577187687,"./browserVersions":1536577187689}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187693, function(require, module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    1: "ls", // WHATWG Living Standard
    2: "rec", // W3C Recommendation
    3: "pr", // W3C Proposed Recommendation
    4: "cr", // W3C Candidate Recommendation
    5: "wd", // W3C Working Draft
    6: "other", // Non-W3C, but reputable
    7: "unoff" // Unofficial, Editor's Draft or W3C "Note"
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187694, function(require, module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    y: 1 << 0,
    n: 1 << 1,
    a: 1 << 2,
    p: 1 << 3,
    u: 1 << 4,
    x: 1 << 5,
    d: 1 << 6
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187695, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * Load this dynamically so that it
 * doesn't appear in the rollup bundle.
 */

var features = exports.features = require('../../data/features');
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1536577187696, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = unpackRegion;

var _browsers = require('./browsers');

function unpackRegion(packed) {
    return Object.keys(packed).reduce(function (list, browser) {
        var data = packed[browser];
        list[_browsers.browsers[browser]] = Object.keys(data).reduce(function (memo, key) {
            var stats = data[key];
            if (key === '_') {
                stats.split(' ').forEach(function (version) {
                    return memo[version] = null;
                });
            } else {
                memo[key] = stats;
            }
            return memo;
        }, {});
        return list;
    }, {});
}
}, function(modId) { var map = {"./browsers":1536577187687}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1536577187685);
})()
//# sourceMappingURL=index.js.map