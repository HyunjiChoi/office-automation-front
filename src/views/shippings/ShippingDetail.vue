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
        <button v-on:click="deleteShipping" class="ui button">
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
          <tr v-for="shipping in shippingList" :key="shipping.noSo+shipping.nmSpitem+shipping.noSo+shipping.nmCust">
            <td>{{ shipping.s }}</td>
            <td>{{ shipping.noSo }}</td>
            <td>{{ shipping.dtSo }}</td>
            <td>{{ shipping.nmShop }}</td>
            <td>{{ shipping.lnPartner }}</td>
            <td>{{ shipping.noOrder }}</td>
            <td>{{ shipping.cdSpitem }}</td>
            <td>{{ shipping.nmSpitem }}</td>
            <td>{{ shipping.cdOpt }}</td>
            <td>{{ shipping.nmOpt }}</td>
            <td>{{ shipping.nmCust }}</td>
            <td>{{ shipping.qtSo }}</td>
            <td>{{ shipping.umVat }}</td>
            <td>{{ shipping.amVat }}</td>
            <td>{{ shipping.cmVat }}</td>
            <td>{{ shipping.caVat }}</td>
            <td>{{ shipping.cm }}</td>
            <td>{{ shipping.ca }}</td>
            <td>{{ shipping.vat }}</td>
            <td>{{ shipping.amRateCharge }}</td>
            <td>{{ shipping.noGir }}</td>
            <td>{{ shipping.payType }}</td>
            <td>{{ shipping.noPo }}</td>
            <td>{{ shipping.noGirMin }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>
</template>

<script>
import {shippingApi} from '@/api';

export default {
  name: "ShippingsDetail",
  created() {
    const {calDt, nmShop} = this.$route.query
    this.calDt = calDt;
    this.nmShop = nmShop;
    this.setData()
  },
  data() {
    return {
      shippingList: null,
      calDt: '',
      nmShop : ''
    }
  },
  methods: {
    async setData() {
      const {data} = await shippingApi.fetchShippingDetail(this.calDt, this.nmShop)
      this.shippingList = data
    },
    async deleteShipping() {
      const { data } = await shippingApi.delteShipping(this.calDt, this.nmShop)
      this.shippingList = data
    }
  }
}
</script>
