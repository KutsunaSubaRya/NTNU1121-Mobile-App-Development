

<template>
  <div class="m-4">
      <h1 class="text-center mb-4">會員表單</h1>
      <p class="text-red-700 text-xs mb-2"> * 為必填欄位</p>
      <el-form :model="loginData" :rules="loginRules">
        <el-form-item label="帳號" prop="accountName">
          <el-input v-model="loginData.accountName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密碼" prop="password">
          <el-input v-model="loginData.password" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="loginData.name" autocomplete="off"></el-input>
        </el-form-item>
        <div class="block mb-4">
          <span class="demonstration mr-5 text-sm">生日</span>
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="Pick a day"
            :size="size"
          />
        </div>
        <div class="block mb-4">
          <span class="demonstration mr-3 text-sm">性別</span>
          <el-select v-model="value" class="m-2" placeholder="選擇性別">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </el-form>
      <div class="flex justify-center">
        <el-form-item>
          <el-button type="success" @click="handleSubmit">送出表單</el-button>
        </el-form-item>
        </div>
        <div class="flex justify-center">
          <el-form-item>
            <el-button type="danger" @click="handleClearForm">清除表單</el-button>
          </el-form-item>
        </div>
      <el-alert v-if="loginError" title="送出失敗" type="error" description="請檢查所有必填欄位是否為空或是電子郵件格式錯誤。" />
      <el-alert v-else-if="sentForm" title="送出成功" type="success"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface LoginData {
  accountName: string;
  password: string;
  name: string;
}

const loginData = ref<LoginData>({
	accountName: "",
	password: "",
	name: "",
});

const loginRules = {
	accountName: [{ required: true, message: "請輸入您的帳號名稱", trigger: "blur" }],
	password: [{ required: true, message: "請輸入您的密碼", trigger: "blur" }],
	name: [{ required: true, message: "請輸入您的姓名", trigger: "blur" }],
};

const loginError = ref(false);
const sentForm = ref(false);

const handleSubmit = (e: Event) => {
	e.preventDefault();
	// Reset error message
	loginError.value = false;
  sentForm.value = true;

	// Validation logic
	if (!loginData.value.accountName || !loginData.value.password || !loginData.value.name) {
		loginError.value = true;
		return;
	}

	if (!isValidEmail(loginData.value.accountName)) {
		loginError.value = true;
		return;
	}

	// Handle form submission logic
	// If validation passes, you can submit the form data here
};

const isValidEmail = (email: string) => {
	// Simple email validation regex
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	return emailRegex.test(email);
};

const handleClearForm = (e: Event) => {
	e.preventDefault();
	loginData.value.accountName = "";
	loginData.value.password = "";
	loginData.value.name = "";
	value1.value = "";
	value.value = "";
  sentForm.value = false;
  loginError.value = false;
};

const size = ref<"default" | "large" | "small">("default");

const value1 = ref("");

const value = ref("");

const options = [
	{
		value: "Male",
		label: "男",
	},
	{
		value: "Female",
		label: "女",
	},
	{
		value: "None",
		label: "不願透露",
	},
];

</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
