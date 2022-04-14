import 'mocha';
import {expect} from 'chai';
import {Genre} from '../../src/models/genre'
import {Album} from '../../src/models/album'
import {Song} from '../../src/models/song';
import {Artist} from '../../src/models/artist';
import {Group} from '../../src/models/group';
import {DataGroupManager} from '../../src/managers/dataGroupManager'



describe('Group Manager class function tests', () => {
    let song = new Song("Song", "Paul", {minutes: 1, seconds: 34}, [], false, 12);
    let album = new Album("", "Paul", 2000, [], [song]);
    let pop = new Genre("Pop", [], [], []);
    let artist1 = new Artist("Paul", [], [pop], [album], [song]);
    let artist2 = new Artist("Zero", [], [pop], [album], [song]);
    let imagine = new Group("Imagine", [artist1, artist2], 2000, [pop], [album], 120);
    let groupManager = new DataGroupManager([imagine]);

  it('It creates a new instance of an object with class DataGroupManager', () => {
    expect(groupManager).to.be.instanceOf(DataGroupManager);
  });

  it('It can read the data from the Database', () => {
    expect(groupManager.readData()).not.to.equal(null);
  });

  it('It can get the groups', () => {
    expect(groupManager.getGroups()).not.to.be.eql(null);
  });

  it('It can get a definded group', () => {
    expect(groupManager.getDefinedGroup("Imagine")).not.to.be.eql(null);
  });

  it('It can get an group name', () => {
    expect(groupManager.getGroupNames()).not.to.be.eql(null);
  });

  it('It can add a new group', () => {
    expect(groupManager.addNewGroup(imagine)).to.be.oneOf([0,-1]);
  });

  it('It can delete an group', () => {
    expect(groupManager.deleteGroup("Imagine")).not.to.be.eql(null);
  });
});