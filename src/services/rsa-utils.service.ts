import { environment } from './../environments/environment';
import { Injectable, OnInit, inject } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import * as Forge from 'node-forge';

@Injectable({
    providedIn: 'root',
})
export class RSAService implements OnInit {
    public publicKey: string = `-----BEGIN CERTIFICATE-----
    MIIDfDCCAmSgAwIBAgIUNHJlkcdwZ2OXkNLw3geHGv06Uh0wDQYJKoZIhvcNAQEL
    BQAwPTELMAkGA1UEBhMCVk4xDDAKBgNVBAgMA0hDTTELMAkGA1UEBwwCUTIxEzAR
    BgNVBAoMCnRoYW5oIHR1YW4wHhcNMjMwNzI1MDIxODQzWhcNMjQwNzI0MDIxODQz
    WjA9MQswCQYDVQQGEwJWTjEMMAoGA1UECAwDSENNMQswCQYDVQQHDAJRMjETMBEG
    A1UECgwKdGhhbmggdHVhbjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEB
    ALhi3PTv1bPvK2ozCV5+d/zQ0jvKR/8QwiBWwqsZyAMezPEiCpH0wSygYXjjhz1e
    MvvkKFDQLbdNW9GZMAZ29iZ/xROHtEYUqDGp7yLF4PlBkM4JljooOQwxwUrxCJIm
    SZi7FFrqezZ71/dFGFiXjw+Pzdgy6tr5YGOudw5YyFDGipUbveYzeYHPBsaMJUEp
    n6QYoNyjZQ+ad0M4uGAKGjNW1/zXRtNpbBWe4tD9NIvPU0Lfis+bkN3D1b+Z6ZQn
    uk3kWEYh+ixUDwLaS07rm5zZIM5WC6IZVF+KkwVglx4WkgGEKC7SgRYJ/7mcuEBp
    jjH67jwTMEo5MPZHbsCpvSsCAwEAAaN0MHIwHQYDVR0OBBYEFNjltQcNBimJFHzB
    A96l8fiKf51NMB8GA1UdIwQYMBaAFNjltQcNBimJFHzBA96l8fiKf51NMA4GA1Ud
    DwEB/wQEAwIFoDAgBgNVHSUBAf8EFjAUBggrBgEFBQcDAQYIKwYBBQUHAwIwDQYJ
    KoZIhvcNAQELBQADggEBAJyZhQvz1sQoZnGKdKLsMvM9jPNPLGNM5vVvC8RIntBm
    ZsBPKMsZr2fgiPyDOFY9y6b8LQulebwim2mD4nd1tgXEUZcdqha26KWtgwNCdXYs
    M3LygkzGGj9mXrgMU57tbJreI57hngKeSDAquNPNLplKHtdbqJdh5H4OgZTK2F9E
    m9Fv3AFBFEeXB26e52AcGh166KwovGiRlQrPix40UHlzzgeuqBpUcRMqAm5Vp0FW
    gg5aMokwwDKZmOaN/yIihT/+r+jVxHt4GMTDJpgdAI7BNPOC5YITir1HzeRtrlm3
    bNnWx/g77NGs6sdmprzAf8DUoPE/E8F5aetltaP7gNg=
    -----END CERTIFICATE-----`;

    constructor() {
    }

    ngOnInit(): void {
    }

    encrypt(valueToEncrypt: string): string {
        var test = JSON.stringify({ id: 1 });
        //let random = this.randomString(16);

        let random ='3MBKWOICG9YWLE8T';
        console.log(random)

        var res = {
            HashKey: this.encryptUsingCertificate(random),
            HashData: this.encryptUsingAES(test, random),
        };
        var res2 = {
            HashKey: this.encryptUsingCertificate(random),
            HashData: btoa( this.encryptUsingAES(test, random)),
        };
        console.log("res1 " );

        console.log(res);

        console.log("res2 " );

        console.log(res2);
        return "";
    }

    encryptUsingCertificate(keyRandom: string) {
        const cer = Forge.pki.certificateFromPem(this.publicKey);
        const bsa = Forge.pki.publicKeyToPem(cer.publicKey);
        const publickKey = Forge.pki.publicKeyFromPem(bsa);
        var encrypted = publickKey.encrypt(Forge.util.encodeUtf8(keyRandom), 'RSA-OAEP');
        return btoa(encrypted.toString());
    }

    encryptUsingAES(data: string, keyRandom: string): any {

// Fix: Use the Utf8 encoder
        debugger;
        var text = Forge.util.encodeUtf8(data);
        // Fix: Use the Utf8 encoder (or apply in combination with the hex encoder a 32 hex digit key for AES-128)
        var key =   Forge.util.encodeUtf8(keyRandom);


        // Fix: Apply padding (e.g. Zero padding). Note that PKCS#7 padding is more reliable and that ECB is insecure
        var encrypted = CryptoJS.AES.encrypt(text, key,
            {
                keySize: 16,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
                iv: this.toWordArray(key)
            });
        var encrypted2 = this.toBase64String( encrypted.ciphertext);
        console.log('encrypted2', encrypted2);
         return encrypted2;

    }

     encryptAES(input: string, key : string){
  
       // var PROTOCOL_AES256 = 2;
         var secret_key = Forge.util.encodeUtf8(key);
        // var header = this.toWordArray("AMAZON" + String.fromCharCode(PROTOCOL_AES256));
         // var iv = CryptoJS.lib.WordArray.random(16);
         var iv = secret_key;

         var body = CryptoJS.AES.encrypt(input, key,
             {  
                mode: CryptoJS.mode.CBC,
                 iv: this.toWordArray(key),
                 padding: CryptoJS.pad.Pkcs7,
                 keySize: 16
             });
  
        // construct the packet
        // HEADER + IV + BODY
        // header.concat(iv);
        // header.concat(body.ciphertext);
  
        // encode in base64
        return this.toBase64String(body.ciphertext);
      }

    toWordArray(str: string){
        return CryptoJS.enc.Utf8.parse(str);
    }
     toString(words: any){
        return CryptoJS.enc.Utf8.stringify(words);
    }
     toBase64String(words: any){
        return CryptoJS.enc.Base64.stringify(words);
      }

    randomString(length: number) {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var result = '';
        for (var i = 0; i < length; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return (result);
    }
}