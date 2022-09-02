declare namespace Activity {
  type Activity = {
    name: string; // 活动名称
    createdTime: string; // 创建时间
    updatedTime: string; // 更新时间
    intro: string; // 活动介绍
    images: string[]; // 活动图片
    author: string; // 活动发布者
    email: string; // 发布者邮箱
  }
}