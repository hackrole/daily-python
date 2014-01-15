#include <stdio.h>
#include "sds.h"


sds sdsnewlen(const void *init, size_t initlen){
  struct sdsdr *sh;

  if(init){
    sh = zmalloc(sizeof(struct sdshdr)+initlen+1);
  }else{
    sh = zcalloc(sizeof(struct sdshdr)+initlen+1);
  }
  if(sh == NULL) return NULL;
  sh->len = initlen;
  sh->free = 0;
  if(initlen && init)
    memcpy(sh->buf, init, intlen);
  sh->buf[initlen] = '\0';
  return (char *)sh->buf
}

sds sdsempty(void){
  return sdsnewlen("", 0);
}

size_t sdslen(const sds s){
  struct sdshdr *sh = (void *)(s - (sizeof(struct sdshdr)));
  return sh->len;
}

sds sdsdup(const sds s){
  return sdsnewlen(s, sdslen(s));
}