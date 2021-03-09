<template>
  <main class="custom-main">
    <section class="custom-section">
      <div class="custom-header">
        <h1 class="ui dividing header">
          <div class="custom-title">
            판매관리
          </div>
          <div class="custom-text">
            (쇼핑몰별 주문 내역 통합)
          </div>
        </h1>
      </div>
      <div class="custom-list">
        <table class="ui unstackable fixed selectable celled table">
          <colgroup>
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
          <tr class="center aligned">
            <th></th>
            <th>
              통합 데이터
            </th>
            <th>
              쇼핑몰 명
            </th>
          </tr>
          </thead>
          <tbody>
          <tr class="center aligned" v-for="sale in sales" :key="sale.calDt">
            <td>
              <div class="ui checkbox">
                <input type="radio" :value="sale.calDt" v-model="pickedSale">
                <label></label>
              </div>
            </td>
            <td>
              {{ sale.calDt }}
            </td>
            <td>
              <ul class="custom-label">
                <li v-for="lnPartner in parseNmShop(sale.lnPartner)" :key="lnPartner">
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
    <section class="custom-section">
      <div class="custom-header">
        <h1 class="ui dividing header">
          <div class="custom-title">
            출하 리스트
          </div>
        </h1>
      </div>
      <div class="custom-list shippingList-list">
        <table class="ui unstackable fixed selectable celled table">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
          <tr class="center aligned">
            <th></th>
            <th>
              정산날짜
            </th>
            <th>
              출하리스트
            </th>
            <th>
              쇼핑몰 명
            </th>
          </tr>
          </thead>
          <tbody>
          <tr class="center aligned" v-for="ship in shippings" :key="ship.calDt + ship.nmShop">
            <td>
              <div class="ui checkbox">
                <input type="radio" :value="ship" v-model="pickedShip">
                <label></label>
              </div>
            </td>
            <td>
              {{ ship.calDt }}
            </td>
            <td>
              {{ ship.fileNm }}
            </td>
            <td>
              <ul class="custom-label">
                <li>
                  <div class="ui label">
                    {{ ship.nmShop }}
                  </div>
                </li>
              </ul>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </section>
    <section class="custom-section">
      <div class="custom-calculate">
        <button class="ui huge primary button">
          정산
        </button>
      </div>
    </section>
  </main>
</template>


<script>
import { confirmApi } from '@/api';

export default {
  name: "ConfirmsAdjustment",
  created() {
    this.setData()
  },
  data() {
    return {
      sales: null,
      shippings: null,
      pickedShip: null,
      pickedSale: null,
    }
  },
  methods: {
    async setData() {
      const { data: { sales, shippings } } = await confirmApi.fetchConfirmAdjustmentList()
      this.sales = sales;
      this.shippings = shippings;
    },
    async deleteConfirm() {
      const { data } = await confirmApi.deleteConfirm()
      console.log(data)
    },
    parseNmShop(lnPartner) {
      return lnPartner.split(' ').filter(el => el)
    }
  }
}
</script>
