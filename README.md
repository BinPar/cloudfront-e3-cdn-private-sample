# CloudFront S3 CDN Private Sample

Sample of how to serve private content using AWS CloudFront from Amazon S3

## Procedimiento seguido para el ejemplo

- Accedí a [AWS Consol](https://038690715956.signin.aws.amazon.com/console) con mis credenciales
- Creé un [directorio privado](https://s3.console.aws.amazon.com/s3/buckets/prh-bibooks/test/?region=eu-west-3&tab=overview) con un  [fichero mp3 privado](https://s3.console.aws.amazon.com/s3/object/prh-bibooks/test/cedric_about_tq_brief.mp3?region=eu-west-3&tab=overview)
- Accedí a [CloudFront](https://console.aws.amazon.com/cloudfront/home?region=eu-west-3#)
- Creé una nueva distribución asociada a prh-bibooks.s3 bajo la URL https://prh-bibooks.s3.amazonaws.com/ siguiendo las instrucciones de https://medium.com/roam-and-wander/using-cloudfront-signed-urls-to-serve-private-s3-content-e7c63ee271db#e627
- Puede verse en: https://console.aws.amazon.com/cloudfront/home?#distribution-settings:E3EUMU31MGT69C
- Decido acceder a los contenidos mediante [URLs Firmadas](https://docs.aws.amazon.com/es_es/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-urls.html) porque Marcos va a empezar con Audio Libros, pero también se podría emplear [Cookies Firmadas](https://docs.aws.amazon.com/es_es/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-cookies.html) para modo de WebView en streaming
- Haciendo Click en La consola de Amazon sobre mi nombre (en la barra superior) elijo la opción `Mis credenciales de seguridad` para generar los certificados de CloudFront (este punto tuvo que hacerlo Marcos porque sono se puede hacer con la cuenta root)
- Me copié las claves privadas y publicas al directorio `keys` del raíz (OJO! cualquiera tendrá que hacer lo mismo porque por motivos evidentes esta añadido al `.gitignore`
- Instalo la librería: `npm i aws-sdk`
