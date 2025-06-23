import { lazy } from 'react';

const DeveloperTools = lazy(() => import('@/pages/DeveloperTools'));
const JsonFormatter = lazy(() => import('@/pages/JsonFormatter'));
const JsonToXml = lazy(() => import('@/pages/JsonToXml'));
const XmlToJson = lazy(() => import('@/pages/XmlToJson'));
const Base64Converter = lazy(() => import('@/pages/Base64Converter'));
const UrlEncoderDecoder = lazy(() => import('@/pages/UrlEncoderDecoder'));
const HtmlMinifierBeautifier = lazy(() => import('@/pages/HtmlMinifierBeautifier'));
const CssMinifierBeautifier = lazy(() => import('@/pages/CssMinifierBeautifier'));
const JavascriptMinifierBeautifier = lazy(() => import('@/pages/JavascriptMinifierBeautifier'));
const UuidGenerator = lazy(() => import('@/pages/UuidGenerator'));
const LoremIpsumGenerator = lazy(() => import('@/pages/LoremIpsumGenerator'));
const ColorCodeConverter = lazy(() => import('@/pages/ColorCodeConverter'));
const RegexTester = lazy(() => import('@/pages/RegexTester'));
const HtmlEntityConverter = lazy(() => import('@/pages/HtmlEntityConverter'));
const TimestampConverter = lazy(() => import('@/pages/TimestampConverter'));
const CharacterByteCounter = lazy(() => import('@/pages/CharacterByteCounter'));
const HttpHeadersViewer = lazy(() => import('@/pages/HttpHeadersViewer'));


export const developerToolRoutes = [
  { path: '/developer-tools', component: DeveloperTools, isToolPage: false, title: "Developer Tools" },
  { path: '/json-formatter', component: JsonFormatter, isToolPage: true, title: "JSON Formatter & Beautifier" },
  { path: '/json-to-xml', component: JsonToXml, isToolPage: true, title: "JSON to XML Converter" },
  { path: '/xml-to-json', component: XmlToJson, isToolPage: true, title: "XML to JSON Converter" },
  { path: '/base64-converter', component: Base64Converter, isToolPage: true, title: "Base64 Encode & Decode" },
  { path: '/url-encoder-decoder', component: UrlEncoderDecoder, isToolPage: true, title: "URL Encode & Decode" },
  { path: '/html-minifier-beautifier', component: HtmlMinifierBeautifier, isToolPage: true, title: "HTML Minifier & Beautifier" },
  { path: '/css-minifier-beautifier', component: CssMinifierBeautifier, isToolPage: true, title: "CSS Minifier & Beautifier" },
  { path: '/javascript-minifier-beautifier', component: JavascriptMinifierBeautifier, isToolPage: true, title: "JavaScript Minifier & Beautifier" },
  { path: '/uuid-generator', component: UuidGenerator, isToolPage: true, title: "UUID Generator" },
  { path: '/lorem-ipsum-generator', component: LoremIpsumGenerator, isToolPage: true, title: "Lorem Ipsum Generator" },
  { path: '/color-code-converter', component: ColorCodeConverter, isToolPage: true, title: "Color Code Converter (HEX, RGB, HSL)" },
  { path: '/regex-tester', component: RegexTester, isToolPage: true, title: "Regex Tester" },
  { path: '/html-entity-converter', component: HtmlEntityConverter, isToolPage: true, title: "HTML Entity Encoder/Decoder" },
  { path: '/timestamp-converter', component: TimestampConverter, isToolPage: true, title: "Timestamp Converter" },
  { path: '/character-byte-counter', component: CharacterByteCounter, isToolPage: true, title: "Character Counter with Byte Info" },
  { path: '/http-headers-viewer', component: HttpHeadersViewer, isToolPage: true, title: "HTTP Headers Viewer" },
];