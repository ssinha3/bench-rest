var config = {};
config.web = {};
config.tableinfo = {};

config.web.port = 8443;
config.web.host = "10.10.10.200"
config.web.cred = "root:mapr"
config.web.ctx = "/rest/table/"
config.tableinfo.srctablebase = "/mapr/cluster1/testTable"
config.tableinfo.dsttablebase = "/mapr/cluster2/testTable"

module.exports = config;