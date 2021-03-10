<template>
  <main class="custom-main">
    <section class="custom-section">
      <div class="custom-header">
        <h1 class="ui dividing header">
          <div class="custom-title">
            판매 관리
          </div>
          <div class="custom-text">
            (쇼핑몰 별 주문 내역 통합)
          </div>
        </h1>
      </div>
      <div class="custom-upload">
        <div class="ui segment">
          <div class="custom-title">
            파일 업로드
          </div>
          <div class="custom-date">
            <div class="ui selection input">
              <input type="text" name="gender">
<!--              <i class="dropdown icon"></i>-->
<!--              <div class="default text">-->
<!--                달력(연월)-->
<!--              </div>-->
<!--              <div class="menu">-->
<!--                <div class="item">-->
<!--                  항목-->
<!--                </div>-->
<!--                <div class="item">-->
<!--                  항목-->
<!--                </div>-->
<!--              </div>-->
            </div>
          </div>
          <div class="custom-file">
            <div class="custom-input">
              <div class="ui fluid action input">
                <input type="file" >
                <div class="ui button">
                  파일선택
                </div>
              </div>
            </div>
<!--            <ul class="custom-label">
              <li>
                <div class="ui label">
                  네이버.xslx
                  <i class="delete icon"></i>
                </div>
              </li>
              <li>
                <div class="ui label">
                  11번가.xslx
                  <i class="delete icon"></i>
                </div>
              </li>
            </ul>-->
          </div>
          <div class="custom-save">
            <button v-on:click="registerSale" class="ui primary button">
              저장
            </button>
          </div>
        </div>
      </div>
      <div class="custom-caption">
<!--        <div class="custom-delete">
          <button class="ui button">
            삭제
          </button>
        </div>-->
<!--          <div class="custom-each">-->
<!--            <div class="ui selection dropdown">-->
<!--              <input type="hidden" name="gender">-->
<!--              <i class="dropdown icon"></i>-->
<!--              <div class="default text">5개씩 보기</div>-->
<!--              <div class="menu">-->
<!--                <div class="item">항목</div>-->
<!--                <div class="item">항목</div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
      </div>
      <div class="custom-list">
        <table class="ui unstackable fixed selectable celled table">
          <colgroup>
            <col />
            <col />
          </colgroup>
          <thead>
          <tr class="center aligned">
            <th>
              정산날짜
            </th>
            <th>
              쇼핑몰 명
            </th>
          </tr>
          </thead>
          <tbody>
          <tr class="center aligned" v-for="sale in saleList" :key="sale.calDt">
            <td>
              <router-link :to="`/sales/detail?calDt=${sale.calDt}`">
              {{ sale.calDt }}
              </router-link>
            </td>
            <td>
              <ul class="custom-label">
                <li v-for="lnPartner in parselnPartner(sale.lnPartner)" :key="lnPartner">
                  <div class="ui label">
                    {{ lnPartner }}
                  </div>
                </li>
              </ul>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>
</template>

<script>
import {saleApi} from '@/api';

export default {
  name: "Sales",
  created() {
    this.setData()
  },
  data() {
    return {
      saleList: null,
      frontVideoFile: ''
    }
  },
  methods: {
    async setData() {
      const { data } = await saleApi.fetchSaleList()
      this.saleList = data
    },
    parselnPartner(lnPartner) {
      return lnPartner.split(' ').filter(el => el)
    },
    async registerSale(){
      const { data } = await saleApi.registerSale()
      this.saleList = data
    }
  }
}
</script>
