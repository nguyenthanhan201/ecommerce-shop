import { RequestMethod } from '@nestjs/common';

interface RouteInfo {
  path: string;
  method: RequestMethod;
  version?: any;
}

export const routers: RouteInfo[] = [
  { path: '/product', method: RequestMethod.GET },
];
