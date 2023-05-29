import Vue from "vue";
import Quill from "quill";
import VueQuillEditor from "vue-quill-editor";
import ImageUploader from "quill-image-uploader";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

import ImageResize from "quill-image-resize-module";

Quill.register("modules/imageResize", ImageResize);

Quill.register("modules/imageUploader", ImageUploader);

Vue.use(VueQuillEditor);
