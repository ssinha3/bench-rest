'use strict';

var config = require('./config');
var uri_prefix = 'https://' + config.web.cred + '@' + config.web.host + ':' + config.web.port + config.web.ctx
var flow = {
    before: [],      // operations to do before anything
    beforeMain: [],  // operations to do before each iteration
    main: [  // the main flow for each iteration, #{INDEX} is unique iteration counter token
        { put:  uri_prefix + 'create/?path='+ config.tableinfo.srctablebase + '#{INDEX}'},
        { get:  uri_prefix + 'create/?path=' + config.tableinfo.srctablebase + '#{INDEX}' },
        { put:  uri_prefix + 'replica/autosetup?path=' + config.tableinfo.srctablebase + '#{INDEX}&replica=' +
        config.tableinfo.dsttablebase + '#{INDEX}'}
    ],
    afterMain: [ // operations to do after each iteration
        { get:  uri_prefix + 'replica/list/?path=' + config.tableinfo.srctablebase + '#{INDEX}'}

    ],
    after: [ // operations to do after everything is done
        { put: uri_prefix + 'replica/remove?path=' + config.tableinfo.srctablebase + '#{INDEX}&replica=' +
        config.tableinfo.dsttablebase + '#{INDEX}' },
        { put: uri_prefix + 'delete/remove?path=' + config.tableinfo.srctablebase + '#{INDEX}' },
        { put: uri_prefix + 'delete/remove?path=' + config.tableinfo.dsttablebase + '#{INDEX}' }
    ]
};

module.exports = flow;