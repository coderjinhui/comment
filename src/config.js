const users = () => {
  const now = Date.now()
  return [
    {
      id: '0001',
      name: '钱高杰',
      gender: 'male',
      upVoteArticles: [],
      downVoteArticles: [],
      upVoteComments: [],
      downVoteComments: [],
    },
    {
      id: '0002',
      name: '于浩思',
      gender: 'male',
      upVoteArticles: [],
      downVoteArticles: [],
      upVoteComments: [],
      downVoteComments: [],
    },
    {
      id: '0003',
      name: '罗暄妍',
      gender: 'female',
      upVoteArticles: [],
      downVoteArticles: [],
      upVoteComments: [],
      downVoteComments: [],
    },
    {
      id: '0004',
      name: '傅湛芳',
      gender: 'female',
      upVoteArticles: [],
      downVoteArticles: [],
      upVoteComments: [],
      downVoteComments: [],
    },
    {
      id: '0005',
      name: '罗雨筠',
      gender: 'female',
      upVoteArticles: [],
      downVoteArticles: [],
      upVoteComments: [],
      downVoteComments: [],
    },
  ].map(d => {
    d.createTime = now + Math.floor(Math.random() * 1e5)
    return d
  })
}

module.exports = {
  collections: {
    USER: 'user',
    COMMENT: 'comment',
    ARTICLE: 'article',
  },
  indexes: {
    users: [
      {key: {id: 1}, name: 'userId', unique: true},
      {key: {createTime: 1,}, name: 'createTime', unique: true}
    ],
    articles: [
      {key: {id: 1}, name: 'userId', unique: true},
      {key: {createTime: 1,}, name: 'createTime', unique: true}
    ]
  },
  articles: [
    {
    id: '0001',
    createTime: 1532839242991,
    title: '春',
    content: '盼望着，盼望着，东风来了，春天的脚步近了。\n' +
      '一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。\n' +
      '小草偷偷地从土里钻出来，嫩嫩的，绿绿的。园子里，田野里，瞧去，一大片一大片满是的。坐着，躺着，打两个滚，踢几脚球，赛几趟跑，捉几回迷藏。风轻悄悄的，草软绵绵的。\n' +
      '桃树、杏树、梨树，你不让我，我不让你，都开满了花赶趟儿。红的像火，粉的像霞，白的像雪。花里带着甜味儿；闭了眼，树上仿佛已经满是桃儿、杏儿、梨儿。花下成千成百的蜜蜂嗡嗡地闹着，大小的蝴蝶飞来飞去。野花遍地是：杂样儿，有名字的，没名字的，散在草丛里，像眼睛，像星星，还眨呀眨的。\n' +
      '“吹面不寒杨柳风”，不错的，像母亲的手抚摸着你。风里带来些新翻的泥土的气息，混着青草味儿，还有各种花的香，都在微微润湿的空气里酝酿。鸟儿将巢安在繁花嫩叶当中，高兴起来了，呼朋引伴地卖弄清脆的喉咙，唱出宛转的曲子，与轻风流水应和着。牛背上牧童的短笛，这时候也成天嘹亮地响着。\n' +
      '雨是最寻常的，一下就是三两天。可别恼。看，像牛毛，像花针，像细丝，密密地斜织着，人家屋顶上全笼着一层薄烟。树叶儿却绿得发亮，小草儿也青得逼你的眼。傍晚时候，上灯了，一点点黄晕的光，烘托出一片安静而和平的夜。在乡下，小路上，石桥边，有撑起伞慢慢走着的人，地里还有工作的农民，披着蓑戴着笠。他们的房屋，稀稀疏疏的在雨里静默着。\n' +
      '天上风筝渐渐多了，地上孩子也多了。城里乡下，家家户户，老老小小，也赶趟儿似的，一个个都出来了。舒活舒活筋骨，抖擞抖擞精神，各做各的一份事去。“一年之计在于春”，刚起头儿，有的是工夫，有的是希望。\n' +
      '春天像刚落地的娃娃，从头到脚都是新的，它生长着。\n' +
      '春天像小姑娘，花枝招展的，笑着，走着。\n' +
      '春天像健壮的青年，有铁一般的胳膊和腰脚，领着我们上前去',
    author: '朱自清',
      upVoteCount: 0,
      downVoteCount: 0,
      commentCount: 0,

    },
    {
      id: '0002',
      createTime: 1532943358540,
      title: '滕王阁序',
      content: `南昌故郡，洪都新府。星分翼轸，地接衡庐。襟三江而带五湖，控蛮荆而引瓯越。物华天宝，龙光射牛斗之墟；人杰地灵，徐孺下陈蕃之榻。雄州雾列，俊彩星驰。台隍枕夷夏之交，宾主尽东南之美。都督阎公之雅望，棨戟遥临；宇文新州之懿范，襜帷暂驻。十旬休暇，胜友如云；千里逢迎，高朋满座。腾蛟起凤，孟学士之词宗，紫电青霜，王将军之武库。家君作宰，路出名区，童子何知，躬逢胜饯。
       时维九月，序属三秋。潦水尽而寒潭清，烟光凝而暮山紫。俨骖騑於上路，访风景於崇阿。临帝子之长洲，得仙人之旧馆。层峦耸翠，上出重霄。飞阁流丹，下临无地。鹤汀凫渚，穷岛屿之萦回；桂殿兰宫，列冈峦之体势。披绣闼，俯雕甍，山原旷其盈视，川泽盱其骇瞩。闾阎扑地，钟鸣鼎食之家。舸舰迷津，青雀黄龙之轴。虹销雨霁，彩彻云衢，落霞与孤鹜齐飞，秋水共长天一色。渔舟唱晚，响穷彭蠡之滨，雁阵惊寒，声断衡阳之浦。遥吟俯畅，逸兴遄飞。爽籁发而清风生，纤歌凝而白云遏。睢园绿竹，气凌彭泽之樽；邺水朱华，光照临川之笔。四美俱，二难并。穷睇眄於中天，极娱游於暇日。天高地迥，觉宇宙之无穷。兴尽悲来，识盈虚之有数。望长安於日下，指吴会於云间。地势极而南溟深，天柱高而北辰远。关山难越，谁悲失路之人？萍水相逢，尽是他乡之客。怀帝阍而不见，奉宣室以何年？
       呜乎！时运不齐，命途多舛！冯唐易老，李广难封。屈贾谊於长沙，非无圣主；窜梁鸿於海曲，岂乏明时？所赖君子安贫，达人知命。老当益壮，宁知白首之心？穷且益坚，不坠青云之志。酌贪泉而觉爽，处涸辙以犹欢。北海虽赊，扶摇可接。东隅已逝，桑榆非晚。孟尝高洁，空怀报国之心；阮籍猖狂，岂效穷途之哭！
       勃，三尺微命，一介书生。无路请缨，等终军之弱冠，有怀投笔，慕宗悫之长风。舍簪笏於百龄，奉晨昏於万里。非谢家之宝树，接孟氏之芳邻。他日趋庭，叨陪鲤对。今晨捧袂，喜托龙门。杨意不逢，抚凌云而自惜。锺期既遇，奏流水以何惭？
       呜呼！胜地不常，盛筵难再。兰亭已矣，梓泽邱墟。临别赠言，幸承恩於伟饯，登高作赋。是所望於群公。敢竭鄙诚，恭疏短引，一言均赋，四韵俱成。
       滕王高阁临江渚，佩玉鸣鸾罢歌舞。画栋朝飞南浦云，珠帘暮卷西山雨。闲云潭影日悠悠，物换星移几度秋。阁中帝子今何在？槛外长江空自流。`,
      author: '王勃',
      upVoteCount: 0,
      downVoteCount: 0,
      commentCount: 0,

    },
  ],
  userDefault: {
    id: '',
    gender: '',
    name: '',
  },
  projection: {projection: {_id: 0}},
  users: users(),
  schema: {
    user: {
      validator: {
        $jsonSchema: {}
      }
    },
    article: {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: [ 'id', 'createTime', 'title', 'content', 'author', 'upVoteCount', 'downVoteCount', 'commentCount' ],
          properties: {
            id: {
              bsonType: 'string',
              description: 'article id'
            },
            createTime: {
              bsonType: 'number',
              description: 'article create time'
            },
            content: {
              bsonType: 'string',
              description: 'article content'
            },
            title: {
              bsonType: 'string',
              description: 'article title',
            },
            author: {
              bsonType: 'string',
              description: 'article author',
            },
            upVoteCount: {
              bsonType: 'number',
              minimum: 0,
              description: 'article up vote count',
            },
            downVoteCount: {
              bsonType: 'number',
              minimum: 0,
              description: 'article down vote count',
            },
            commentCount: {
              bsonType: 'number',
              minimum: 0,
              description: 'article comment count',
            }
          }
        }
      }
    },
    comment: {
      validator: {
        $jsonSchema: {}
      }
    }
  }
}