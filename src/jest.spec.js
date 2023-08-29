import React from 'react';
import {mock, mockPartial} from './jest';

describe('jest helpers', () => {
  describe('mock()', () => {
    it('should create a dummy component', () => {
      const comp = mock('HelloComponent');
      expect(comp).toBeInstanceOf(Function);
      expect(comp.displayName).toBe('HelloComponent');
    });

    it('should copy own properties', () => {
      const real = {a: 1, b: 'c', f: () => {}};
      const comp = mock('HelloComponent', real);
      expect(comp.a).toBe(1);
      expect(comp.b).toBe('c');
      expect(comp.f).toBe(real.f);
    });

    it('should not copy React Component methods', () => {
      const comp = mock('HelloComponent', class extends React.Component {});
      expect(comp.render).toBeUndefined();
    });

  });

  describe('mockPartial()', () => {
    it('should mock component', () => {
      expect(mockPartial({a: 1}, ['a']).a).toBeInstanceOf(Function);
    });

    it('should mock only specified components', () => {
      const pkg = mockPartial({a: 1, b: 2}, ['a']);
      expect(pkg.a).not.toBe(1);
      expect(pkg.b).toBe(2);
    });

    it('should mock nested components', () => {
      const pkg = mockPartial({a: {a: 1, b: 2}}, ['a', 'a.a']);
      expect(pkg.a).toBeInstanceOf(Function);
      expect(pkg.a.a).toBeInstanceOf(Function);
      expect(pkg.a.b).toBe(2);
    });
  });
});
