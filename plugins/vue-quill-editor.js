import Vue from "vue";
import Quill from "quill";

import VueQuillEditor from "vue-quill-editor";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

import ImageResize from "quill-image-resize-module";

Quill.register("modules/imageResize", ImageResize);

Vue.use(VueQuillEditor);

/////////////

// import Vue from "vue";
// import { VueEditor, Quill } from "vue2-editor";
// import ImageResize from "quill-image-resize-vue";

// import "vue2-editor/dist/vue2-editor.css";

// // Quill.register("modules/imageResize", ImageResize);

// Vue.use(VueEditor);
