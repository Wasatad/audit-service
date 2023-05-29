import Vuex from "vuex";
const puppeteer = require("puppeteer");
import db from "@/assets/firebase/firebaseInit";
// import firebaseAdmin from "@/assets/firebase/firebaseAdminInit";
// require("@/assets/firebase/firebaseAdminInit");
// require("firebase/firestore");
// import firebase from "firebase";
// import { currentUser, getIdToken } from "firebase/auth";
// import { getAuth } from "firebase-admin/auth";

// import { getUserFromCookie, getUserFromSession } from "@/helpers";
import {
  query,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  collection,
  orderBy,
  where,
  limit,
  updateDoc,
  deleteDoc,
  increment,
  doc,
  startAt,
} from "firebase/firestore";
// import { storage } from "@/assets/firebase/firebaseStorage";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { uid } from "uid";

const store = () => {
  return new Vuex.Store({
    state: {
      uid: null,
      user: {
        email: "",
        role: "",
        admin: false,
      },
      token: "",
      test: "test from store",
      currentProject: {},
      projects: [],
      archiveProjects: [],
      template: {},
    },
    mutations: {
      async setUser(state, payload) {
        let isAdmin = false;
        let role = "";
        if (
          payload.id == "c3EqzuaQdfhyMO0xvtgddfPoilC2" ||
          payload.id == "gNkddv1NJfRhO7MEQGVnrOLkwaL2"
        ) {
          isAdmin = true;
        }
        if (payload.id == "c3EqzuaQdfhyMO0xvtgddfPoilC2") {
          role = "designer";
        } else if (payload.id == "R8eGSom70APzjMo3PwO2kLa3LtF2") {
          role = "editor";
        }
        state.user.role = role;
        state.user.admin = isAdmin;
        state.user.email = payload.email;
        state.user.name = payload.name;
        state.user.photo = payload.photo;
      },
      setStatus(state, payload) {
        let section = state.currentProject.data[payload.chapterName].sections;

        for (let i = 0; i < section.length; i++) {
          if (section[i].name == payload.sectionName) {
            for (let j = 0; j < section[i].questions.length; j++) {
              if (section[i].questions[j].question == payload.question) {
                section[i].questions[j].status = payload.status;
              }
            }
          }
        }
      },
      addQuestion(state, payload) {
        let section = state.currentProject.data[payload.chapterName].sections;
        for (let i = 0; i < section.length; i++) {
          if (section[i].name == payload.sectionName) {
            // console.log(section[i]);
            section[i].questions.push({
              question: "Новый пункт",
              answer: "",
              status: "",
              id: uid(),
            });
          }
        }
      },
      deleteQuestion(state, payload) {
        let section = state.currentProject.data[payload.chapterName].sections;

        for (let i = 0; i < section.length; i++) {
          if (section[i].name == payload.sectionName) {
            for (let j = 0; j < section[i].questions.length; j++) {
              if (section[i].questions[j].id == payload.id) {
                section[i].questions = section[i].questions.filter((el) => {
                  return el.id != payload.id;
                });
              }
            }
          }
        }
      },
      deleteTemplateQuestion(state, payload) {
        let section = state.template[payload.chapterName].sections;

        for (let i = 0; i < section.length; i++) {
          if (section[i].name == payload.sectionName) {
            for (let j = 0; j < section[i].questions.length; j++) {
              if (section[i].questions[j].question == payload.question) {
                section[i].questions = section[i].questions.filter((el) => {
                  return el.question != payload.question;
                });
              }
            }
          }
        }
      },
      addTemplateQuestion(state, payload) {
        let section = state.template[payload.chapterName].sections;
        for (let i = 0; i < section.length; i++) {
          if (section[i].name == payload.sectionName) {
            // console.log(section[i]);
            section[i].questions.push({
              question: "Новый пункт",
              answer: "",
              status: "",
              id: uid(),
            });
          }
        }
      },
      updateTemplateInStore(state, payload) {
        let section = state.template[payload.chapterName].sections;
        for (let i = 0; i < section.length; i++) {
          if (section[i].name == payload.sectionName) {
            console.log(section[i]);
            console.log(state.template[payload.chapterName].sections[i]);
            console.log(payload.newValue);
            state.template[payload.chapterName].sections[i].questions =
              payload.newValue;
          }
        }
        this.dispatch("updateTemplate");
      },
    },
    getters: {
      test: (state) => () => state.test,
    },
    actions: {
      setPerfomanceReport(context, payload) {
        context.state.currentProject.data.perfomance.pageSpeed = payload;
        context.dispatch("updateProject");
      },
      async updateTemplate(context) {
        await setDoc(doc(db, "template", "template"), {
          data: context.state.template,
        });
      },
      async getTemplate(context) {
        // Получаем шаблон аудита из базы
        const docRef = doc(db, "template", "template");
        const docSnap = await getDoc(docRef);
        context.state.template = docSnap.data().data;
      },
      async uploadImageToProject(context, payload) {
        const storage = getStorage();
        let imgID = `${context.state.currentProject.projectID}-${uid()}`;
        const storageRef = ref(storage, `inner-images/${imgID}`);

        let snapshot = await uploadBytes(storageRef, payload.file);
        let url = await getDownloadURL(snapshot.ref);
        context.state.currentProject.innerImages.push(imgID);
        return url;
      },
      async uploadImageToTemplate(context, payload) {
        const storage = getStorage();
        let imgID = `template-${uid()}`;
        const storageRef = ref(storage, `template/${imgID}`);

        let snapshot = await uploadBytes(storageRef, payload.file);
        let url = await getDownloadURL(snapshot.ref);
        context.state.template.templateImages.push(imgID);
        return url;
      },
      async removeImageFromProject(context, payload) {
        const storage = getStorage();

        // Create a reference to the file to delete
        const desertRef = ref(storage, `inner-images/${payload.imageID}`);

        // Delete the file
        deleteObject(desertRef)
          .then(() => {
            // File deleted successfully
            console.log("File deleted successfully");
          })
          .catch((error) => {
            // Uh-oh, an error occurred!
            console.log(error);
          });

        context.state.currentProject.innerImages =
          context.state.currentProject.innerImages.filter((id) => {
            return id != payload.imageID;
          });
      },
      async removeImageFromTemplate(context, payload) {
        const storage = getStorage();

        // Create a reference to the file to delete
        const desertRef = ref(storage, `template/${payload.imageID}`);

        // Delete the file
        deleteObject(desertRef)
          .then(() => {
            // File deleted successfully
            console.log("File deleted successfully");
          })
          .catch((error) => {
            // Uh-oh, an error occurred!
            console.log(error);
          });

        context.state.template.templateImages =
          context.state.template.templateImages.filter((id) => {
            return id != payload.imageID;
          });
      },
      async makeScreenshot() {
        const browser = await puppeteer.launch({
          defaultViewport: {
            width: 1200,
            height: 800,
          },
          headless: true,
        });
        const page = await browser.newPage();
        // await page.setDefaultNavigationTimeout(0);
        await page.goto(
          "https://nuxtjs.org/docs/directory-structure/store/#the-nuxtserverinit-action",
          {
            waitUntil: "domcontentloaded",
          }
        );
        await page.screenshot({
          path: "assets/img/screenshots/screenshot5.png",
        });
        await browser.close();
      },
      async createProject(context, payload) {
        let newProject = {
          projectID: uid(),
          name: payload.name,
          timestamp: Date.now(),
          website: payload.site,
          image: "",
          data: {},
          innerImages: [],
          performanceReport: {},
        };

        // Получаем шаблон аудита из базы
        await context.dispatch("getTemplate");
        let template = context.state.template;

        try {
          // Получаем картинку
          const res = await this.$axios.get(`/api/test/${payload.site}`);

          const base64Response = await fetch(
            `data:image/jpeg;base64,${res.data}`
          );
          const blob = await base64Response.blob();

          // Firebase фото
          const storage = getStorage();
          const storageRef = ref(storage, `preview/${newProject.projectID}`);

          const uploadTask = uploadBytesResumable(storageRef, blob);
          let imageURL = "";

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
              }
            },
            (error) => {
              // Handle unsuccessful uploads
            },
            () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log("File available at", downloadURL);

                imageURL = downloadURL;

                newProject.image = imageURL;

                // Находим в базе шаблон и копируем его в новый объект
                const clone = structuredClone(template);
                newProject.data = clone;

                context.state.projects.push(newProject);

                addDoc(collection(db, "projects"), {
                  image: newProject.image,
                  name: newProject.name,
                  projectID: newProject.projectID,
                  timestamp: newProject.timestamp,
                  website: newProject.website,
                  data: newProject.data,
                  innerImages: newProject.innerImages,
                });
              });
            }
          );
        } catch (e) {
          console.log(e);
        }
      },
      async deleteProject(context, payload) {
        let removingProjectId = "";

        // Удаляем документ из firebase
        let projectsCollection = collection(db, "projects");
        let removingProjectQ = query(
          projectsCollection,
          where("projectID", "==", payload.projectID)
        );

        // Получем список всех внутренних картинок в проекте
        let innerImages = [];

        let querySnapshot = await getDocs(removingProjectQ);
        querySnapshot.forEach((doc) => {
          // console.log("doc");
          // console.log(doc);
          removingProjectId = doc.id;
          // console.log(doc.id, " => ", doc.data());
          // console.log(doc.data());
          // (doc.id, " => ", doc.data())
          innerImages = doc.data().innerImages;
        });
        console.log(removingProjectId);
        await deleteDoc(doc(db, "projects", removingProjectId));

        // Удаляем картинку из firestore
        const storage = getStorage();
        const storageRef = ref(storage, `preview/${payload.projectID}`);
        // Delete the file
        deleteObject(storageRef)
          .then(() => {
            // File deleted successfully
          })
          .catch((error) => {
            // Uh-oh, an error occurred!
          });

        //Удалить также из стейта
        context.state.projects = context.state.projects.filter((item) => {
          console.log(item.projectID);
          return item.projectID != payload.projectID;
        });

        // Удаляем фотки из базы

        for (let i = 0; i < innerImages.length; i++) {
          const desertRef = ref(storage, `inner-images/${innerImages[i]}`);
          // Delete the file
          deleteObject(desertRef)
            .then(() => {
              // File deleted successfully
              console.log("File deleted successfully");
            })
            .catch((error) => {
              // Uh-oh, an error occurred!
              console.log(error);
            });
        }
      },
      async updateProject(context) {
        // Обновляем документ в firebase
        let currentDocfirestoreId = "";
        let projectsCollection = collection(db, "projects");
        let searchCurrentQ = query(
          projectsCollection,
          where("projectID", "==", context.state.currentProject.projectID)
        );
        let querySnapshot = await getDocs(searchCurrentQ);
        querySnapshot.forEach((doc) => {
          currentDocfirestoreId = doc.id;
        });

        await setDoc(doc(db, "projects", currentDocfirestoreId), {
          image: context.state.currentProject.image,
          name: context.state.currentProject.name,
          projectID: context.state.currentProject.projectID,
          timestamp: context.state.currentProject.timestamp,
          website: context.state.currentProject.website,
          data: context.state.currentProject.data,
          innerImages: context.state.currentProject.innerImages,
        });
      },
      async downLoadProjectsList(context) {
        let projectsCollection = collection(db, "projects");
        let projectsQ = query(projectsCollection);
        let projectsDocSnapshot = await getDocs(projectsQ);
        context.state.projects = [];
        projectsDocSnapshot.forEach((doc) => {
          context.state.projects.push(doc.data());
        });
      },
      async downLoadArchiveProjectsList(context) {
        let archiveProjectsCollection = collection(db, "archive-projects");
        let projectsQ = query(archiveProjectsCollection);
        let projectsDocSnapshot = await getDocs(projectsQ);
        context.state.archiveProjects = [];
        projectsDocSnapshot.forEach((doc) => {
          context.state.archiveProjects.push(doc.data());
        });
      },
      async downLoadCurrentProject(context, id) {
        let projects = collection(db, "projects");
        let searchCurrentQ = query(projects, where("projectID", "==", id));
        let firstDocSnapshot = await getDocs(searchCurrentQ);
        // firstDocSnapshot.forEach((doc) => {
        //   context.state.currentProject = doc.data();
        //   console.log(context.state.currentProject);
        // });

        var bar = new Promise((resolve, reject) => {
          firstDocSnapshot.forEach((doc, index, array) => {
            // console.log(doc.data());
            context.state.currentProject = doc.data();
            resolve();
          });
        });

        bar.then(() => {
          console.log("All done!");
        });
      },
      async nuxtServerInit({ dispatch }, context) {
        // console.log(context.route);
        // console.log(context.route.params.id);
        let projectID = context.route.params.id;
        let currentIsEmpty =
          Object.keys(context.store.state.currentProject).length === 0;
        // console.log("^^^^^^^");
        // console.log(projectID);
        // console.log(currentIsEmpty);
        if (currentIsEmpty && projectID) {
          await dispatch("downLoadCurrentProject", projectID);
          // console.log("Get It!");
        }
      },
    },
  });
};

export default store;
