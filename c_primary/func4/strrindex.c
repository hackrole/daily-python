#include <stdio.h>

#define array_len(s) (sizeof(s)/sizeof(s[0]))

int strrindex(const char ar, const char s[]);

/*
 * for test the strrindex function
 */
int main(int argc, char *argv[])
{
char s[] = "hello world";
char ar = 'l';
printf("the r is %d", strrindex(ar, s));
  return 0;
}

int strrindex(const char ar, const char s[]){
int len = array_len(s);
int i;
for(i=len; i >0; i++){
if(s[i] == ar){
return i;
}
}
return -1;
}
