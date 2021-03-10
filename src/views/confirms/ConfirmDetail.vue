<template>
  <main class="custom-main">
    <section class="custom-section">
      <div class="custom-header">
        <h1 class="ui dividing header">
          <div class="custom-title">
          {{ nmShop }} 구매 확정 리스트
      </div>
        </h1>
      </div>
      <div class="custom-delete">
        <button v-on:click="deleteConfirm" class="ui button">
          삭제
        </button>
      </div>
      <div class="custom-list">
        <table class="ui unstackable very compact small celled table">
          <thead>
          <tr class="center aligned">
            <th>S<br>선택</th>
            <th>NO_SO<br>접수번호</th>
            <th>DT_SO<br>접수일</th>
            <th>NM_SHOP<br>접수유형</th>
            <th>LN_PARTNER<br>매출처</th>
            <th>NO_ORDER<br>No Order</th>
            <th>CD_SPITEM<br>상품코드</th>
            <th>NM_SPITEM<br>상품명</th>
            <th>CD_OPT<br>옵션코드</th>
            <th>NM_OPT<br>옵션명</th>
            <th>NM_CUST<br>주문자</th>
            <th>QT_SO<br>수량</th>
            <th>UM_VAT<br>판매단가(VAT)</th>
            <th>AM_VAT<br>판매금액(VAT)</th>
            <th>마감단가_VAT<br>마감단가(VAT)</th>
            <th>마감금액_VAT<br>마감금액(VAT)</th>
            <th>마감단가<br>마감단가</th>
            <th>마감금액<br>마감금액</th>
            <th>VAT<br>VAT</th>
            <th>AM_RATE_CHARGE<br>정율수수료</th>
            <th>NO_GIR<br>의뢰번호</th>
            <th>PAY_TYPE<br>결재형태</th>
            <th>NO_PO<br>발주번호</th>
            <th>NO_GIR_MIN<br>최초의뢰번호</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="confirm in confirmList" :key="confirm.noSo+confirm.nmSpitem+confirm.noSo+confirm.nmCust">
            <td>{{ confirm.s }}</td>
            <td>{{ confirm.noSo }}</td>
            <td>{{ confirm.dtSo }}</td>
            <td>{{ confirm.nmShop }}</td>
            <td>{{ confirm.lnPartner }}</td>
            <td>{{ confirm.noOrder }}</td>
            <td>{{ confirm.cdSpitem }}</td>
            <td>{{ confirm.nmSpitem }}</td>
            <td>{{ confirm.cdOpt }}</td>
            <td>{{ confirm.nmOpt }}</td>
            <td>{{ confirm.nmCust }}</td>
            <td>{{ confirm.qtSo }}</td>
            <td class="price">{{ confirm.umVat | commaFilter }}</td>
            <td class="price">{{ confirm.amVat | commaFilter }}</td>
            <td class="price">{{ confirm.cmVat | commaFilter }}</td>
            <td class="price">{{ confirm.caVat | commaFilter }}</td>
            <td class="price">{{ confirm.cm | commaFilter}}</td>
            <td class="price">{{ confirm.ca | commaFilter}}</td>
            <td class="price">{{ confirm.vat | commaFilter }}</td>
            <td>{{ confirm.amRateCharge }}</td>
            <td>{{ confirm.noGir }}</td>
            <td>{{ confirm.payType }}</td>
            <td>{{ confirm.noPo }}</td>
            <td>{{ confirm.noGirMin }}</td>
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
import { confirmApi } from '@/api';

export default {
  name: "ConfirmsDetail",
  created() {
    const {calDt, nmShop} = this.$route.query
    this.calDt = calDt;
    this.nmShop = nmShop;
    this.setData()
  },
  data() {
    return {
      confirmList: null,
      calDt: '',
      nmShop: ''
    }
  },
  methods: {
    async setData() {
      const { data } = await confirmApi.fetchConfirmDetail(this.calDt,this.nmShop)
      this.confirmList = data
    },
    async deleteConfirm() {
      if (!confirm('삭제하시겠습니까?')) return;
        const { data } = await confirmApi.deleteConfirm(this.calDt, this.nmShop)
        this.confirmList = data
    }
  },
  filters: {
    commaFilter(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }
}
</script>
