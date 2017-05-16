import { expect } from 'chai';
import UserInfoView from '../src/userinfo-view';

describe('UserInfoView', () => {
  it('should return new instance', () => {
    let view = new UserInfoView();
    expect(view).to.be.ok;
  });
});
