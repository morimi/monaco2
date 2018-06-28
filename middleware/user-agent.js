export default function (context) {
  context.userAgent = process.server ? context.req.headers['user-agent'] : (typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown')
}
