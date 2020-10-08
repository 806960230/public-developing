<template>
   <ul class="content" :style="{'padding-top': offsetTop + 'px'}">
            <li v-for="(item,index) in finalList" :key="index" class="list-box" @click="showDetail(item._id)">
                <div class="list-head">
                    <div class="title">
                        <span class="type" :class="['type-'+item.catalog]" v-if="item.catalog === 'share'">分享</span>
                        <span class="type" :class="['type-'+item.catalog]" v-if="item.catalog === 'ask'">提问</span>
                        <span class="type" :class="['type-'+item.catalog]" v-if="item.catalog === 'discuss'">讨论</span>
                        <span class="type" :class="['type-'+item.catalog]" v-if="item.catalog === 'advise'">建议</span>
                        <!-- <span class="ellipsis">{{item.title}}</span> -->
                    </div>
                </div>
                <div class="author">
                    <div class="inline-block" @click.stop="showUser(item.uid._id)">
                        <img class="head" :src="item.uid.pic || '/img/bear-200-200.jpg'">
                        <span class="name">{{item.uid.name || '未知用户'}}</span>
                        <i class="vip" v-show="item.uid.isVip !== '0'">VIP{{item.uid.isVip}}</i>
                    </div>
                </div>
                <div class="list-body">
                    <div class="info">{{item.content}}</div>
                    <img class="fmt" :src="item.snapshot" v-show="item.snapshot" />
                </div>
                <div class="list-footer">
                    <div class="left">
                        <span class="reply-num">{{item.answer}} 回复</span>
                        <span class="timer">{{item.created | moment}}</span>
                    </div>
                </div>
            </li>
            <li v-if="isEnd" class="nomore">没有更多了~</li>
        </ul>
</template>

<script>
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.extend(relativeTime)
export default {
   props:{
     lists: {
       type: Array,
       default: () => {

       }
     },
     offsetTop: {
       type: Number,
       default: 0
     },
     isEnd: { // 是否继续上拉还有更多数据，如果没有则为true
       type: Boolean,
       default: false
     }
   },
   data () {
     return {
        lists: [{
        isEnd: '0',
        reads: 7,
        answer: 3,
        status: 0,
        isTop: '0',
        sort: '0',
        _id: '5dca7446ba723835b12f4c83',
        title: 'test2',
        catalog: 'ask',
        content: 'mock',
        tags: [],
        uid: {
          nmae: 'mock',
          isVip: '0',
          pic: '',
          _id: '5dc188b467435317a8247b09',
          id: '5dc188b467435317a8247b09'
        },
        created: '2019-11-12 08:58:46',
        __v:0,
        id: '5dca7446ba723835b12f4c83'
      },
      {
        isEnd: '0',
        reads: 7,
        answer: 3,
        status: 0,
        isTop: '0',
        sort: '0',
        _id: '5dca7446ba723835b12f4c83',
        title: 'test2',
        catalog: 'advise',
        content: 'mock',
        tags: [],
        uid: {
          nmae: 'mock',
          isVip: '0',
          pic: '',
          _id: '5dc188b467435317a8247b09',
          id: '5dc188b467435317a8247b09'
        },
        created: '2019-11-12 08:58:46',
        __v:0,
        id: '5dca7446ba723835b12f4c83'
      },
      {
        isEnd: '0',
        reads: 7,
        answer: 3,
        status: 0,
        isTop: '0',
        sort: '0',
        _id: '5dca7446ba723835b12f4c83',
        title: 'test2',
        catalog: 'discuss',
        content: 'mock',
        tags: [],
        uid: {
          nmae: 'mock',
          isVip: '0',
          pic: '',
          _id: '5dc188b467435317a8247b09',
          id: '5dc188b467435317a8247b09'
        },
        created: '2019-11-12 08:58:46',
        __v:0,
        id: '5dca7446ba723835b12f4c83'
      },
      {
        isEnd: '0',
        reads: 7,
        answer: 3,
        status: 0,
        isTop: '0',
        sort: '0',
        _id: '5dca7446ba723835b12f4c83',
        title: 'test2',
        catalog: 'share',
        content: 'mock',
        tags: [],
        uid: {
          nmae: 'mock',
          isVip: '0',
          pic: '',
          _id: '5dc188b467435317a8247b09',
          id: '5dc188b467435317a8247b09'
        },
        created: '2019-11-12 08:58:46',
        __v:0,
        id: '5dca7446ba723835b12f4c83'
      }],
     }
   },
   methods: {

   },
   computed: {
    finalList () {  // isBefore检查一个dayjs对象是否在另一个dayjs对象时间之前
     // dayjs().subtract减少时间并返回一个新的dayjs对象
      return this.lists.map((item) => {
        let date = item.created;
          if (dayjs(date).isBefore(dayjs().subtract(7,'days'))) {
            date = dayjs(date).format('YYYY-MM-DD')
          } else {
            date = dayjs(date).locale('zh-cn').from(dayjs())
          }
          item.created = date
          return item
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.item {
  text-align: center;
  align-self: flex-end;
  padding-bottom: 5px;
  div {
    padding-top: 5px;
  }
}

li {
  list-style: none;
}
.list-box {
  padding: 30px 30px;
  background-color: #fff;
  margin-bottom: 20px;
}
.list-head {
  margin-bottom: 18px;
  .type {
    display: inline-block;
    height: 36px;
    width: 72px;
    text-align: center;
    line-height: 36px;
    white-space: nowrap;
    margin-right: 10px;
    font-size: 24px;
    border-radius: 18px;
    border-bottom-left-radius: 0;
    color: #fff;
  }
  .type-share {
    background-color: #feb21e;
  }
  .type-ask {
    background-color: #02d199;
  }
  .type-discuss {
    background-color: #fe1e1e;
  }
  .type-advise {
    background-color: #0166f8;
  }
  .title {
    color: #333;
    font-size: 32px;
    line-height: 44px;
    font-weight: bold;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    .ellipsis {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .type {
      min-width: 40px;
      transform: scale(0.9);
      position: relative;
      top: -1px;
    }
  }
}
.content {
  background:#f5f6f7;
  padding-bottom: 100px;
  .nomore {
    text-align: center;
    padding: 25px 0;
    color: #333;
  }
}
.author {
  display: flex;
  align-items: center;
  font-size: 24px;
  margin-right: 30px;
  margin-bottom: 18px;
  color: #666;
  .head {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    margin-right: 10px;
    vertical-align: middle;
    position: relative;
    top: -4px;
  }
}
.list-body {
  margin-bottom: 30px;
  display: flex;
  .info {
    font-size: 28px;
    color: #666;
    max-height: 94px;
    flex: 1;
    margin-right: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    .fmt {
      width: 192px;
      height: 122px;
      border-radius: 8px;
    }
  }
}

.list-footer {
  color: #999;
  font-size: 24px;
  display: flex;
  align-items: center;
  .left {
    flex: 1;
    display: flex;
    align-items: center;
    .svg-icon {
      margin-right: 5px;
    }
    .timer {
      margin-left: 20px;
    }
  }
}
</style>
