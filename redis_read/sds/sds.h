#ifndef _SDS_H_
#define _SDS_H_

#include <sys/types.h>
#include <stdarg.h>

typedef char *sds;

struct sdshdr {
  int len;
  int free;
  char buf[];
};

/*
 * can't understand
 */
static size_t sdslen(const sds s){
  struct sdshdr *sh = (void *)(s - (sizeof(struct sdshdr)));
  return sh->len;
}

sds sdsnewlen(const void *init, size_t initlen); //创建一个指定长度的sds
sds sdsnew(const char* init); // 根据给定的字符串创建一个sds 
sds sdsempty(void); // 创建一个空sds
size_t sdsdup(const sds s); // 复制给定的sds
void sdsfree(sds s); // 释放给定的sds
size_t sdsvail(const sds s); 
sds sdsgrouzero(sds s, size_t len); // 将指定sds的buf扩展到制定长度，无内容用\0补充
sds sdscatlen(sds s, const void *t, size_t len);
sds sdscat(sds s, const char *t); // 将一个指定的字符串追加到sds末尾
sds sdscatlen(); // 按指定长度对sds扩展，并将一个字符串追加到末尾
sds sdscatsds(sds s, const sds t);
sds sdscpylen(sds s, const char *t, size_t len); // 将一个sds字符串内容复制到sds中，需要是对sds进行扩展
sds sdscpy(sds s, const char *t); // 将一个字符串复制奥sds

sds sdscatvprintf(sds s, const char *fmt, va_list ap);


#endif /* _SDS_H_ */