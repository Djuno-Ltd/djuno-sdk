/// <reference types="vite-plugin-svgr/client" />
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default content;
}
