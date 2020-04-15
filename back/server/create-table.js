var server = require('./server');
var ds = server.dataSources.db;
var lbTables = ['OrderRow', 'Order', 'Customer', 'Note', 'Role', 'RoleMapping', 'ACL', 'AccessToken'];
ds.automigrate(lbTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' - lbTables - '] created in ', ds.adapter.name);
  ds.disconnect();
});