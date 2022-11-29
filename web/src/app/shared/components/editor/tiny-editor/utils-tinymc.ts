/**
 * Copyright (c) 2017-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { EventEmitter } from '@angular/core';
import { EditorComponent } from './tiny-editor.component';
import { validEvents, Events } from './event';

const bindHandlers = (ctx: EditorComponent, editor: any): void => {
  const allowedEvents = getValidEvents(ctx);
  allowedEvents.forEach((eventName) => {
    const eventEmitter: EventEmitter<any> = ctx[eventName];
    editor.on(eventName.substring(2), (event: any) => ctx.ngZone.run(() => eventEmitter.emit({ event, editor })));
  });
};

const getValidEvents = (ctx: EditorComponent): (keyof Events)[] => {
  const ignoredEvents = parseStringProperty(ctx.ignoreEvents, []);
  const allowedEvents = parseStringProperty(ctx.allowedEvents, validEvents).filter(
    (event) => validEvents.includes(event as (keyof Events)) && !ignoredEvents.includes(event)) as (keyof Events)[];
  return allowedEvents;
}

const parseStringProperty = (property: string | string[] | undefined, defaultValue: (keyof Events)[]): string[] => {
  if ( typeof property === 'string') {
    return property.split(',').map((value) => value.trim());
  }
  if ( Array.isArray(property)) {
    return property;
  }
  return defaultValue;
};

let unique = 0;

const uuid = (prefix: string): string => {
  const date = new Date();
  const time = date.getTime();
  const random = Math.floor(Math.random() * 1000000000);

  unique++;

  return prefix + '_' + random + unique + String(time);
};

const isTextarea = (element?: Element): element is HTMLTextAreaElement => {
  return typeof element !== 'undefined' && element.tagName.toLowerCase() === 'textarea';
};

const normalizePluginArray = (plugins?: string | string[]): string[] => {
  if (typeof plugins === 'undefined' || plugins === '') {
    return [];
  }

  return Array.isArray(plugins) ? plugins : plugins.split(' ');
};

const mergePlugins = (initPlugins: string | string[], inputPlugins?: string | string[]) =>
  normalizePluginArray(initPlugins).concat(normalizePluginArray(inputPlugins));

// tslint:disable-next-line:no-empty
const noop: (...args: any[]) => void = () => { };

const isNullOrUndefined = (value: any): value is null | undefined => value === null || value === undefined;

export {
  bindHandlers,
  uuid,
  isTextarea,
  normalizePluginArray,
  mergePlugins,
  noop,
  isNullOrUndefined
};