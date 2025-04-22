import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../stores/auth';
const authStore = useAuthStore();
const emit = defineEmits(['job-added']);
const form = ref({
    title: '',
    company: '',
    status: 'Applied',
    resume_link: '',
    notes: '',
});
const error = ref(null);
const handleSubmit = async () => {
    if (!authStore.isAuthenticated) {
        error.value = 'You must be logged in';
        return;
    }
    try {
        await axios.post('http://localhost:5000/api/jobs', form.value);
        emit('job-added');
        form.value = { title: '', company: '', status: 'Applied', resume_link: '', notes: '' };
        error.value = null;
    }
    catch (err) {
        error.value = err.response?.data?.error || 'Failed to add job';
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    ...{ onSubmit: (__VLS_ctx.handleSubmit) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    placeholder: "Job Title",
    required: true,
});
(__VLS_ctx.form.title);
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    placeholder: "Company",
    required: true,
});
(__VLS_ctx.form.company);
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    value: (__VLS_ctx.form.status),
    required: true,
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "Applied",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "Interviewed",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "Rejected",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    placeholder: "Resume Link",
});
(__VLS_ctx.form.resume_link);
__VLS_asFunctionalElement(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)({
    value: (__VLS_ctx.form.notes),
    placeholder: "Notes",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    type: "submit",
});
if (__VLS_ctx.error) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "error" },
    });
    (__VLS_ctx.error);
}
/** @type {__VLS_StyleScopedClasses['error']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            form: form,
            error: error,
            handleSubmit: handleSubmit,
        };
    },
    emits: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    emits: {},
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=JobForm.vue.js.map