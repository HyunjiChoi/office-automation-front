<template>
  <main class="custom-main">
    <section class="custom-section">
      <div class="custom-header">
        <h1 class="ui dividing header">
          <div class="custom-title">
            판매 관리
          </div>
        </h1>
      </div>
      <div class="custom-delete">
        <button class="ui button">
          삭제
        </button>
      </div>
      <div class="custom-list">
        <table class="ui unstackable very compact small celled table">
          <thead>
          <tr class="center aligned">
            <th>월</th>
            <th>일</th>
            <th>구분</th>
            <th>소구</th>
            <th>주문번호</th>
            <th>업체명</th>
            <th>품목</th>
            <th>판매단가</th>
            <th>색상</th>
            <th>수량</th>
            <th>판매금액</th>
            <th>수수료</th>
            <th>금액</th>
            <th>합계</th>
            <th>비고</th>
            <th>구매자</th>
            <th>정산여부</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="sale in saleList" :key="sale.noOrder">
            <td>{{ sale.calMonth }}</td>
            <td>{{ sale.calDay }}</td>
            <td>{{ sale.salesType }}</td>
            <td>{{ sale.ap }}</td>
            <td>{{ sale.noOrder }}</td>
            <td>{{ sale.lnPartner }}</td>
            <td>{{ sale.nmSpitem }}</td>
            <td>{{ sale.cm }}</td>
            <td>{{ sale.color }}</td>
            <td>{{ sale.qtSo }}</td>
            <td>{{ sale.ca }}</td>
            <td>{{ sale.vat }}</td>
            <td>{{ sale.price }}</td>
            <td>{{ sale.sum }}</td>
            <td>{{ sale.etc }}</td>
            <td>{{ sale.nmcust }}</td>
            <td>{{ sale.calWh }}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="custom-button">
        <button class="ui primary button">
          파일 다운로드
        </button>
      </div>
    </section>
  </main>
</template>

<script>
import { saleApi } from '@/api';

export default {
  name: "SalesDetail",
  created() {
    this.setData()
    console.log('dd')
  },
  data() {
    return {
      saleList: null,
      calDt: '2021-03-01'
    }
  },
  methods: {
    async setData() {
      const {data} = await saleApi.fetchSaleDetail(this.calDt)
      this.saleList = data
    }
  }
}
</script>
