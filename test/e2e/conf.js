let SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
  framework: 'jasmine2',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  suites: {
    homepage: 'homepageSpec.js',
    search: 'searchSpec.js',
  },
  jasmineNodeOpts: {
  showColors: true,
  silent: true,
  defaultTimeoutInterval: 360000,
  print: function () {
    }
  },
  onPrepare: function () {
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      },
      summary: {
        displayDuration: false
      }
    }));
  }
};


// exports.config = {
//   framework: 'jasmine2',
//   jasmineNodeOpts: {
//     showColors: true,
//     silent: true,
//     defaultTimeoutInterval: 360000,
//     print: function () {
//     }
//   },
//   specs: [
//     './spec/protractor-spec.js'
//   ],
//   capabilities: {
//     browserName: 'chrome',
//     'chromeOptions': {
//       args: ['--test-type']
//     }
//   },
//   onPrepare: function () {
//     jasmine.getEnv().addReporter(new SpecReporter({
//       spec: {
//         displayStacktrace: true
//       },
//       summary: {
//         displayDuration: false
//       }
//     }));
//   }
// };
