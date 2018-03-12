module.exports = {
  get0Time(){
    var date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(1);
    return date.getTime();
  },
  get24Time(){
    var date = new Date();
    date.setHours(24);
    date.setMinutes(0);
    date.setSeconds(0);
    return date.getTime();
  },
  get1DayAgo0Time(){
    return this.getPre(-24, 0, 1);
  },
  get1DayAgo24Time(){
    return this.getPre(0, 0, 0);
  },
  get2DayAgo24Time(){
    return this.getPre(-24, 0, 0);
  },
  get2DayAgo0Time(){
    return this.getPre(-48, 0, 1);
  },
  get2DayAgo(){
    return new Date(this.get2DayAgo0Time());
  },
  getPre(h, m, s){
    var date = new Date();
    date.setHours(h);
    date.setMinutes(m);
    date.setSeconds(s);
    return date.getTime();
  }
}
