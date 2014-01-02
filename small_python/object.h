#ifndef OBJECT_H
#define OBJECT_H

#define PyObject_HEAD  \
  int ob_refcnt;       \
  struct _typeobject *ob_type;

#define PyObject_VAR_HEAD \
  PyObject_HEAD \
  int ob_size;

typedef struct _object {
  PyObject_HEAD
} PyObject;

typedef struct {
  PyObject_VAR_HEAD
} PyVarObject;

#define Py_REFCNT(ob)  (((PyObject*)(ob))->ob_refcnt)
#define Py_TYPE(ob)   (((PyObject*)(ob)))->ob_type)
#define Py_SIZE(ob)  (((PyObject*)(ob)))->ob_size)


typedef struct {
  PyObject_HEAD
  long ob_ival;
} PyIntObject;

(PyObject *) PyInt_FromLong(long);

typedef struct {
  PyObject_HEAD
  long ob_shash;
  int ob_sstate;
  char ob_sval[1];
} PyStringObject;

typedef struct {
  PyObject_HEAD
  PyObject **ob_item;
  int allocated;
} PyListObject;

typedef struct {
  PyObject_HEAD
  int ma_fill;
  int ma_user;
  int ma_mask;
  // TODO
}
 
#endif
