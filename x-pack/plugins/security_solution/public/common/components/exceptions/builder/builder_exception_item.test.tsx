/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { mount } from 'enzyme';
import euiLightVars from '@elastic/eui/dist/eui_theme_light.json';

import { ExceptionListItemComponent } from './builder_exception_item';
import { fields } from '../../../../../../../../src/plugins/data/common/index_patterns/fields/fields.mocks.ts';
import { getExceptionListItemSchemaMock } from '../../../../../../lists/common/schemas/response/exception_list_item_schema.mock';
import {
  getEntryMatchMock,
  getEntryMatchAnyMock,
} from '../../../../../../lists/common/schemas/types/entries.mock';

describe('ExceptionListItemComponent', () => {
  describe('and badge logic', () => {
    test('it renders "and" badge with extra top padding for the first exception item when "andLogicIncluded" is "true"', () => {
      const exceptionItem = getExceptionListItemSchemaMock();
      exceptionItem.entries = [getEntryMatchMock(), getEntryMatchMock()];
      const wrapper = mount(
        <ThemeProvider theme={() => ({ eui: euiLightVars, darkMode: false })}>
          <ExceptionListItemComponent
            exceptionItem={exceptionItem}
            exceptionId={'123'}
            exceptionItemIndex={0}
            indexPattern={{
              id: '1234',
              title: 'logstash-*',
              fields,
            }}
            isLoading={false}
            andLogicIncluded={true}
            isOnlyItem={false}
            onDeleteExceptionItem={jest.fn()}
            onChangeExceptionItem={jest.fn()}
          />
        </ThemeProvider>
      );

      expect(
        wrapper.find('[data-test-subj="exceptionItemEntryFirstRowAndBadge"]').exists()
      ).toBeTruthy();
    });

    test('it renders "and" badge when more than one exception item entry exists and it is not the first exception item', () => {
      const exceptionItem = getExceptionListItemSchemaMock();
      exceptionItem.entries = [getEntryMatchMock(), getEntryMatchMock()];
      const wrapper = mount(
        <ThemeProvider theme={() => ({ eui: euiLightVars, darkMode: false })}>
          <ExceptionListItemComponent
            exceptionItem={exceptionItem}
            exceptionId={'123'}
            exceptionItemIndex={1}
            indexPattern={{
              id: '1234',
              title: 'logstash-*',
              fields,
            }}
            isLoading={false}
            andLogicIncluded={true}
            isOnlyItem={false}
            onDeleteExceptionItem={jest.fn()}
            onChangeExceptionItem={jest.fn()}
          />
        </ThemeProvider>
      );

      expect(wrapper.find('[data-test-subj="exceptionItemEntryAndBadge"]').exists()).toBeTruthy();
    });

    test('it renders indented "and" badge when "andLogicIncluded" is "true" and only one entry exists', () => {
      const exceptionItem = getExceptionListItemSchemaMock();
      exceptionItem.entries = [getEntryMatchMock()];
      const wrapper = mount(
        <ThemeProvider theme={() => ({ eui: euiLightVars, darkMode: false })}>
          <ExceptionListItemComponent
            exceptionItem={exceptionItem}
            exceptionId={'123'}
            exceptionItemIndex={1}
            indexPattern={{
              id: '1234',
              title: 'logstash-*',
              fields,
            }}
            isLoading={false}
            andLogicIncluded={true}
            isOnlyItem={false}
            onDeleteExceptionItem={jest.fn()}
            onChangeExceptionItem={jest.fn()}
          />
        </ThemeProvider>
      );

      expect(
        wrapper.find('[data-test-subj="exceptionItemEntryInvisibleAndBadge"]').exists()
      ).toBeTruthy();
    });

    test('it renders no "and" badge when "andLogicIncluded" is "false"', () => {
      const exceptionItem = getExceptionListItemSchemaMock();
      exceptionItem.entries = [getEntryMatchMock()];
      const wrapper = mount(
        <ThemeProvider theme={() => ({ eui: euiLightVars, darkMode: false })}>
          <ExceptionListItemComponent
            exceptionItem={exceptionItem}
            exceptionId={'123'}
            exceptionItemIndex={1}
            indexPattern={{
              id: '1234',
              title: 'logstash-*',
              fields,
            }}
            isLoading={false}
            andLogicIncluded={false}
            isOnlyItem={false}
            onDeleteExceptionItem={jest.fn()}
            onChangeExceptionItem={jest.fn()}
          />
        </ThemeProvider>
      );

      expect(
        wrapper.find('[data-test-subj="exceptionItemEntryInvisibleAndBadge"]').exists()
      ).toBeFalsy();
      expect(wrapper.find('[data-test-subj="exceptionItemEntryAndBadge"]').exists()).toBeFalsy();
      expect(
        wrapper.find('[data-test-subj="exceptionItemEntryFirstRowAndBadge"]').exists()
      ).toBeFalsy();
    });
  });

  describe('delete button logic', () => {
    test('it renders delete button disabled when it is only entry left in builder', () => {
      const exceptionItem = getExceptionListItemSchemaMock();
      exceptionItem.entries = [getEntryMatchMock()];
      const wrapper = mount(
        <ExceptionListItemComponent
          exceptionItem={exceptionItem}
          exceptionId={'123'}
          exceptionItemIndex={0}
          indexPattern={{
            id: '1234',
            title: 'logstash-*',
            fields,
          }}
          isLoading={false}
          andLogicIncluded={false}
          isOnlyItem={true}
          onDeleteExceptionItem={jest.fn()}
          onChangeExceptionItem={jest.fn()}
        />
      );

      expect(
        wrapper.find('[data-test-subj="exceptionItemEntryDeleteButton"] button').props().disabled
      ).toBeTruthy();
    });

    test('it does not render delete button disabled when it is not the only entry left in builder', () => {
      const exceptionItem = getExceptionListItemSchemaMock();
      exceptionItem.entries = [getEntryMatchMock()];

      const wrapper = mount(
        <ExceptionListItemComponent
          exceptionItem={exceptionItem}
          exceptionId={'123'}
          exceptionItemIndex={0}
          indexPattern={{
            id: '1234',
            title: 'logstash-*',
            fields,
          }}
          isLoading={false}
          andLogicIncluded={false}
          isOnlyItem={false}
          onDeleteExceptionItem={jest.fn()}
          onChangeExceptionItem={jest.fn()}
        />
      );

      expect(
        wrapper.find('[data-test-subj="exceptionItemEntryDeleteButton"] button').props().disabled
      ).toBeFalsy();
    });

    test('it does not render delete button disabled when "exceptionItemIndex" is not "0"', () => {
      const exceptionItem = getExceptionListItemSchemaMock();
      exceptionItem.entries = [getEntryMatchMock()];
      const wrapper = mount(
        <ExceptionListItemComponent
          exceptionItem={exceptionItem}
          exceptionId={'123'}
          exceptionItemIndex={1}
          indexPattern={{
            id: '1234',
            title: 'logstash-*',
            fields,
          }}
          isLoading={false}
          andLogicIncluded={false}
          // if exceptionItemIndex is not 0, wouldn't make sense for
          // this to be true, but done for testing purposes
          isOnlyItem={true}
          onDeleteExceptionItem={jest.fn()}
          onChangeExceptionItem={jest.fn()}
        />
      );

      expect(
        wrapper.find('[data-test-subj="exceptionItemEntryDeleteButton"] button').props().disabled
      ).toBeFalsy();
    });

    test('it does not render delete button disabled when more than one entry exists', () => {
      const exceptionItem = getExceptionListItemSchemaMock();
      exceptionItem.entries = [getEntryMatchMock(), getEntryMatchMock()];
      const wrapper = mount(
        <ExceptionListItemComponent
          exceptionItem={exceptionItem}
          exceptionId={'123'}
          exceptionItemIndex={0}
          indexPattern={{
            id: '1234',
            title: 'logstash-*',
            fields,
          }}
          isLoading={false}
          andLogicIncluded={false}
          isOnlyItem={true}
          onDeleteExceptionItem={jest.fn()}
          onChangeExceptionItem={jest.fn()}
        />
      );

      expect(
        wrapper.find('[data-test-subj="exceptionItemEntryDeleteButton"] button').at(0).props()
          .disabled
      ).toBeFalsy();
    });

    test('it invokes "onChangeExceptionItem" when delete button clicked', () => {
      const mockOnDeleteExceptionItem = jest.fn();
      const exceptionItem = getExceptionListItemSchemaMock();
      exceptionItem.entries = [getEntryMatchMock(), getEntryMatchAnyMock()];
      const wrapper = mount(
        <ExceptionListItemComponent
          exceptionItem={exceptionItem}
          exceptionId={'123'}
          exceptionItemIndex={0}
          indexPattern={{
            id: '1234',
            title: 'logstash-*',
            fields,
          }}
          isLoading={false}
          andLogicIncluded={false}
          isOnlyItem={true}
          onDeleteExceptionItem={mockOnDeleteExceptionItem}
          onChangeExceptionItem={jest.fn()}
        />
      );

      wrapper
        .find('[data-test-subj="exceptionItemEntryDeleteButton"] button')
        .at(0)
        .simulate('click');

      expect(mockOnDeleteExceptionItem).toHaveBeenCalledWith(
        {
          ...exceptionItem,
          entries: [getEntryMatchAnyMock()],
        },
        0
      );
    });
  });
});
