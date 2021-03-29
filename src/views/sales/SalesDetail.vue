<template>
  <main class="custom-main">
    <section class="custom-section">
      <div class="custom-header">
        <h1 class="ui dividing header">
          <div class="custom-title">
            {{calDt}} 판매 관리
          </div>
        </h1>
      </div>
      <div class="custom-delete">
        <button v-on:click="deleteSale" class="ui button">
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
          <tr v-for="sale in saleList" :key="sale.noOrder+sale.nmSpitem+sale.sum+sale.nmCust">
            <td>{{ sale.calMonth }}</td>
            <td>{{ sale.calDay }}</td>
            <td>{{ sale.salesType }}</td>
            <td>{{ sale.ap }}</td>
            <td>{{ sale.noOrder }}</td>
            <td>{{ sale.lnPartner }}</td>
            <td>{{ sale.nmSpitem }}</td>
            <td class="price">{{ sale.cm | commaFilter }}</td>
            <td>{{ sale.color }}</td>
            <td>{{ sale.qtSo }}</td>
            <td class="price">{{ sale.ca | commaFilter }}</td>
            <td class="price">{{ sale.vat | commaFilter }}</td>
            <td class="price">{{ sale.price | commaFilter }}</td>
            <td class="price">{{ sale.sum | commaFilter }}</td>
            <td>{{ sale.etc }}</td>
            <td>{{ sale.nmCust }}</td>
            <td>{{ sale.calWh }}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="custom-button">
        <button class="ui primary button"  @click="downExcel" :disabled="isFetching">
          파일 다운로드
        </button>
      </div>
    </section>
  </main>
</template>

<script>
import {saleApi} from '@/api';
import fileSaver from "@/util/fileSaver";

export default {
  name: "SalesDetail",
  created() {
    const {calDt} = this.$route.query
    this.calDt = calDt;
    this.setData()
  },
  data() {
    return {
      saleList: null,
      calDt: '',
    }
  },
  methods: {
    async setData() {
      const {data} = await saleApi.fetchSaleDetail(this.calDt)
      this.saleList = data
    },
    async deleteSale() {
      if (!confirm('삭제하시겠습니까?')) return;
      await saleApi.deleteSale(this.calDt)
      alert('삭제되었습니다.')
      this.moveMenu('/sales')
    },
    async downExcel(){
      this.isFetching = true;
      fileSaver.downloadExcelFile(await saleApi.fetchSalesXlsx(this.calDt), `${this.calDt} 판매관리.xlsx`)
      this.isFetching = false;
    }
  },
  filters: {
    commaFilter(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  },
  watch: {
    isFetching(){
      this.$store.commit('setShowLoader', this.isFetching);
    }
  }
}
</script>
