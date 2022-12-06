'use strict';

module.exports = Object.freeze({
    whiteList: "*",
    googleCloud: {
        keyfile: {
            "type": "service_account",
            "project_id": "test-d7840",
            "private_key_id": "1f9a3dafc3aca5047eca733380fb6118918b369a",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEugIBADANBgkqhkiG9w0BAQEFAASCBKQwggSgAgEAAoIBAQC0Ouc3XL1/Y94E\nicLMtLQPxyfgriZPXGFW3LHBFlpiZcqndsGRUpD23phZ853CYlXjWwvLG9dfeQEo\nIoUig8Potz9sOn5oiS9h4+QHIpF3nkeYLLjb4rc8RKVliDVyCjqxSw+mEHECAaLo\n8lCihfCE/Lhf7X9L9dR6sLnv78Wuu73cIBGO0kvBmqUjaSvl+lzg5q7/J2wDomCk\nDDZ0fHVhs39kfEUoKcSNdg20sJFuLDZpPTTnTy9DaLSZDCn/k+g21LB7HcCjFKbs\nPGU0EURDD0EHmWDLti6oFq1uImU2d+RrV6VxDcqkMWxWcBDzJ0J815uPO9ZMnlLw\nyq/qba6RAgMBAAECggEACmVJYpVGrZCQ76RokuPWF6uOSR89Fh/HJ4+kRcsTHJDa\n2cJM/k5hDomesmA4bcwRQINxuzNDFCkydWJZro4jdeANWEyexPXWFf3jRbwV4EHw\nxujGzZFsA0hsXTO4Qs3Z6ScMuIXt7BvfDd5djfpOz2+U95zcgQD60rbbNWlC9vCZ\ndqBv3YayfaQeLtf1uRfkMrn3aPD1cG2skTu8BfPY+NE3nR3zwjoD6lLFtL4jgx6y\ncMJ4+5roArgtctJU2qp9iOdvix+rW2ciXegOM/q2CmvZADe27aj2tggECgLrJX3k\n/JC1yIcBj4FBDEkvo3BtqIzsgHyaz/mTzh5vgFYHKQKBgQDmi8pgOswa68CoAsNj\ncByFnPnSrAEgPX4rz/4ft8lnElDII9/bD5R84o9uR44FCC9uK31KHyHHMtTfpMm/\n/i8LOheTzQLaDYyQNFf3yG4MBTjYxAClBNvGe7PJYnK2/6RBar39VCU6/qWaqtKw\nxRii8WSow135S5rrxOmhOElgHQKBgQDIIPhTy6aQ+j6iqjzMX5bwXA6TsCQAZVkQ\nRq0sNwCrmCPUVsBn3yXPuHGes/Ldwo9z0UmlofS0RBQY1YdSCxmcUexuPFzxMGDW\nQXDRmfFNOfN5/dE0I2noM7I441aSBn46x/XKkTlHlv+erzMOtpo8jzDTZAfO2yFf\noTPIZ5ymBQKBgHlTTaBQsQLl2FBSi/KzmD70ekBVBo6p7dEutySH+rSEXgDFaFQH\nIfSK4kJ9445gXV2UA25Tbdo/tOkw9n9US/uTib7dX8fS44ssELM0Rj2LLfxdQZ2W\nLfaJOPcdGROW+yD2BJ/hfWpLgmkfxpsCTlHJyVhK4BSGpjO3P9/5GBw9AoGABbtU\nAWpiweI46wW/KgdO1mF8lWRFE7HTZDDyAsMshL2dwRYe+pqchZ99uZLj0NAital3\n14OU85jDjpaHAqWIvT5nbBzUeJ/vFhPXvFkRXSncvFC1ri2ZeeoJH7H7J8GB2gMi\nGgQgxNkhRxUzfCdksXlUZ6mEw7ro8Mk4J3Q4O1UCfz5YnkavFZT8Q6U8ret61Euj\n25ItPnv21w2T1vT0X9HCRsSSJ9P21sJAdNcbFwIfWlmJUj7S0O/F65LUcFNSWDgJ\n7b9SY2XdHHMl8sxtwKcs/dGDzCXtk5HDrSLpEJyDYadC3Wlpe9tVT5Lig+tQNuE8\niOr4Wh1NXvqTIpwvfBI=\n-----END PRIVATE KEY-----\n",
            "client_email": "firebase-adminsdk-21sj4@test-d7840.iam.gserviceaccount.com",
            "client_id": "113391328075195561391",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-21sj4%40test-d7840.iam.gserviceaccount.com"
        },
        databaseURL: 'https://test-d7840-default-rtdb.firebaseio.com/'
    },
    keyPhone: {
        phoneTwilio: '+1 505 405 4753',
        accountSid: 'AC5eedcbd01de1d34f83107a1cac072e8b',
        authToken: '27d5d5915823396a3713920f70482c1d'
    },

    mongoDb: {
        url: 'mongodb://127.0.0.1:27017/mie',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }
    },
    s3:{
        accessKeyId: 'AKIAQTWNMC4AGLRGYILU',
        secretAccessKey: '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',
        bucket:"rionlab-testserver",
        host:"https://rionlab-testserver.s3.us-west-2.amazonaws.com/",
        folder:"mie"
    },
    jwt: {
        key: "SGF2ZSB0byBkZWFsIHdpdGggQmFzZTY0IGZvcm1hdD8gVGhlbiB0aGlzIHNpdGUgaXMgbWFkZSBmb3IgeW91ISBVc2UgdGhlIHN1cGVyIHNpbXBsZSBvbmxpbmUgZm9ybSBiZWxvdyB0byBkZWNvZGUgb3IgZW5jb2RlIHlvdXIgZGF0YS4gSWYgeW91J3JlIGludGVyZXN0ZWQgYWJvdXQgdGhlIGlubmVyIHdvcmtpbmdzIG9mIHRoZSBCYXNlNjQgZm9ybWF0LCBqdXN0IHJlYWQgdGhlIGRldGFpbGVkIGRlc2NyaXB0aW9uIGF0IHRoZSBib3R0b20gb2YgdGhlIHBhZ2UuIFdlbGNvbWUh"
    },

    email: {
        emailName: 'mie運営局',
        emailAddress: 'noreply-test@rion-lab.com',
        password: 'DREamUS_2018',
        accessKeyId: 'AKIAQTWNMC4ANAFDUPES',
        secretAccessKey: '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',
        emailReceive: '',
        hostImap: 'imap.mail.us-east-1.awsapps.com',
        region:"us-west-2"
    },
    host: 'http://mie.rion-lab.com',
    encodeDecode: {
        clientKey: 'SChN56MvzoPDHZzjYR3hx8Fka4Q0uQnQv02DJhZHTJBOLFOC0biiLGOpBavxC5Z7YwRQ7mKD8Mxa2O0l7q638x0wf6hC5WctUp3wSVdq5Wre1560622142246CCJW3z2M4lshADE1GVTfQkBuHnt8YvyULSX76qF9r0OoxcgjCiPIZpaRbN5eKmwdE',
        serverKey: 'S8IVDaO7kSIFyx62CNXjcS06eoaWVgWrYhDXdUjc4hsGKQGPjCTAKhdTCGHifb0WxPJibfymfvwqGq06weHvV81849KvPh3jLzLEU1pw0jttgcM6Hh5MyLdaa8cJecoSdQSYSbB4nWDtwMEK1560575871729CC4fgBP1WyITUF8ElbcJXQ6kvxpneu3isjZKDq5A927RGwaHhm0NotdMLOzrVCYSE',
    },
    imageDir: '/var/www/farming/images',
    line: {
        client_id: '1654861818',
        client_secret: '809ace4021663a54a78cd7e82d438146',
        grant_type: 'authorization_code',
        redirect_uri: 'https://localhost:4200/auth/register-line',
    },
    stripePayment: {
        secretKey: 'sk_test_NdhTu5HZuErNDWjuD1xRd2MK00h6qposX1'
    },
    admin: {
        phone: '+84962309906',
        password: 'admin123',
        id: "6059af719689fd168b1eaab0"
    }
});